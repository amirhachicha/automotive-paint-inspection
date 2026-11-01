const PAINT_API_BASES = ['http://127.0.0.1:8000', 'http://localhost:8000'];
const VERDICT_LABELS = {
  origine: 'Original',
  repeint: 'Repainted',
  incertain: 'Uncertain',
};

function PaintInspection() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [result, setResult] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const fileInputRef = React.useRef(null);

  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const selectFile = (file) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setSelectedFile(null);
    setResult(null);
    setErrorMessage('');

    if (!file) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setErrorMessage('Accepted formats: JPEG and PNG only.');
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const onFileSelected = (event) => {
    selectFile(event.target.files?.[0] || null);
    event.target.value = '';
  };

  const analyze = async () => {
    if (!selectedFile || isLoading) return;

    setIsLoading(true);
    setResult(null);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('file', selectedFile);

    let response = null;
    let lastError = null;

    for (const baseUrl of PAINT_API_BASES) {
      try {
        response = await fetch(`${baseUrl}/paint/predict`, {
          method: 'POST',
          body: formData,
        });
        break;
      } catch (error) {
        lastError = error;
      }
    }

    try {
      if (!response) {
        throw new Error(lastError?.message || 'Backend is unreachable.');
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || data.message || 'Server error.');
      }

      setResult(data);
    } catch (error) {
      setErrorMessage(
        error.message || 'Unable to contact the paint analysis server.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setErrorMessage('');
    setIsLoading(false);
  };

  return (
    <main className="paint-page">
      <section className="paint-shell">
        <header className="paint-header">
          <p className="paint-eyebrow">Experimental model</p>
          <h1>Automotive Paint Classification</h1>
          <p className="paint-intro">
            Upload a macro image to estimate whether the paint is original or repainted.
          </p>
        </header>

        <section className="paint-workspace">
          <div className="paint-left-column">
            <section className="paint-input-card">
              <div className="file-picker">
                <span className="picker-title">Choose an image</span>
                <span className="picker-hint">
                  JPEG or PNG, one image, maximum 10 MB
                </span>
                <button
                  className="picker-button"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose file
                </button>
                <span className="picker-file-status">
                  {selectedFile?.name || 'No file selected'}
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="file-input"
                  accept="image/jpeg,image/png"
                  onChange={onFileSelected}
                />
              </div>

              {previewUrl ? (
                <>
                  <div className="preview-frame">
                    <img src={previewUrl} alt="Selected source image" />
                  </div>
                  <p className="file-name">{selectedFile?.name}</p>
                </>
              ) : (
                <div className="empty-preview">No preview available</div>
              )}

              {!result && (
                <button
                  className="validate-button"
                  type="button"
                  disabled={!selectedFile || isLoading}
                  onClick={analyze}
                >
                  {isLoading ? 'Analysis in progress...' : 'Analyze image'}
                </button>
              )}

              {isLoading && (
                <p className="paint-loading-message" role="status">
                  The model is analyzing your image...
                </p>
              )}

              {errorMessage && (
                <p className="paint-error-message" role="alert">
                  {errorMessage}
                </p>
              )}
            </section>

            {result?.cropped_image && (
              <section className="paint-crop-card">
                <h2>Area used by the model</h2>
                <div className="crop-preview-frame">
                  <img
                    src={result.cropped_image}
                    alt="Central area used by the model"
                  />
                </div>
                <p className="crop-note">
                  Peripheral edges are removed before inference to limit the
                  influence of vignetting and the bright center circle.
                </p>
              </section>
            )}
          </div>

          <aside className="result-panel" aria-live="polite">
            {result ? (
              <div className={`paint-result-card verdict-${result.verdict}`}>
                <p className="paint-eyebrow">Result</p>
                <h2>{VERDICT_LABELS[result.verdict] || result.verdict}</h2>

                <div className="paint-confidence">
                  <span>Confidence</span>
                  <strong>{Math.round(result.confidence * 100)}%</strong>
                </div>

                {[
                  ['Original paint', result.probabilities.origine, 'origine'],
                  ['Repainted', result.probabilities.repeint, 'repeint'],
                ].map(([label, probability, type]) => (
                  <div className="paint-probability-row" key={type}>
                    <div>
                      <span>{label}</span>
                      <strong>{Math.round(probability * 100)}%</strong>
                    </div>
                    <div className={`paint-probability-bar ${type}`}>
                      <span style={{ width: `${probability * 100}%` }} />
                    </div>
                  </div>
                ))}

                <p className="paint-experimental-note">
                  Experimental result, model {result.model_version}
                </p>
                <button className="paint-reset-button" type="button" onClick={reset}>
                  New analysis
                </button>
              </div>
            ) : (
              <div className="paint-result-placeholder">
                <span>01</span>
                <h2>Your result will appear here</h2>
                <p>Select an image, then analyze it to start inference.</p>
              </div>
            )}
          </aside>
        </section>
      </section>
    </main>
  );
}

window.PaintInspection = PaintInspection;