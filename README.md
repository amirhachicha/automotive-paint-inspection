# Automotive Repainted Panel Qualification Using Computer Vision

An experimental application that estimates whether an automotive paint surface appears to be original or repainted based on a close-up image. The system relies on an **EfficientNet-B0** model and a **FastAPI** API, accessed through a **React** web interface.

The result is indicative: it does not replace professional inspection or instrumental measurement. The project aims to explore the feasibility of classifying automotive paint textures, rather than providing industrial certification.

## Features

- Selection and preview of a JPEG or PNG image.
- Image submission to the API using the multipart field `file`.
- Classification into three possible verdicts: `origine`, `repeint`, or `incertain`.
- Display of prediction confidence and the probabilities of the `origine` and `repeint` classes.
- Optional display of the central image region used for analysis.
- Model loading on the backend: the browser does not directly load the Keras model weights.

## Project Structure

```text
automotive-paint-inspection/
├── backend/
│   ├── main.py                         # FastAPI application and CORS configuration
│   ├── paint_analysis.py               # Endpoint and inference logic
│   ├── requirements.txt                # Backend dependencies
│   └── models/
│       └── paint/
│           └── efficientnet_binaire_phase2_best.keras
├── frontend/
│   └── ...                             # React interface and styles
├── repainted model/                    # Research/training materials, if authorized
├── docs/
│   └── requirements/paint_defects/      # Project documentation
├── tests/
│   └── backend/
│       └── test_paint_predict_contract.py
├── .gitignore
└── README.md
```

The exact structure may vary depending on the files available in the repository. Do not publish datasets, internal reports, or code originating from another project without first verifying that their distribution is authorized.

## Prerequisites

- Python 3.11 recommended.
- Node.js 18 or later and npm.
- Git.
- Git LFS, if the Keras model in the repository is distributed using Git LFS.

## Installation and Local Setup

From the repository root, open two PowerShell terminals.

### 1. Install Backend Dependencies

If the `venv` virtual environment does not already exist, create it at the repository root:

```powershell
py -3.11 -m venv venv
.\venv\Scripts\python.exe -m pip install -r backend\requirements.txt
```

If the model is tracked using Git LFS, retrieve its contents after cloning the repository:

```powershell
git lfs install
git lfs pull
```

### 2. Start the Backend

In the first terminal:

```powershell
cd backend
..\venv\Scripts\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8000
```

The API is available at [http://127.0.0.1:8000](http://127.0.0.1:8000). The health check endpoint is [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health), and the interactive API documentation is available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

The model is loaded when the first prediction is requested. Therefore, the first request may take longer than subsequent requests.

### 3. Start the Frontend

In the second terminal, from the repository root:

```powershell
cd frontend
npm install
npm run dev
```

If PowerShell blocks the `npm` command because of its execution policy, use `npm.cmd` instead:

```powershell
npm.cmd run dev
```

Open [http://localhost:3000/paint-inspection](http://localhost:3000/paint-inspection).

The provided interface loads React and Babel from a CDN. Therefore, an Internet connection is required if these libraries are not served locally.

The development server serves the application at this address and returns the main page for `/paint-inspection`.

## Paint Inspection API

### `POST /paint/predict`

Sends an image to the model to obtain a prediction.

- Request type: `multipart/form-data`.
- File field name: `file`.
- Accepted formats: JPEG and PNG (`image/jpeg`, `image/png`).
- Maximum file size: 10 MiB (approximately 10.5 decimal MB).

PowerShell example using `curl.exe`:

```powershell
curl.exe -X POST "http://127.0.0.1:8000/paint/predict" -F "file=@C:/path/to/image.jpg"
```

The JSON response includes, in particular:

- `verdict`: `origine`, `repeint`, or `incertain`;
- `confidence`: confidence associated with the prediction, between 0 and 1;
- `probabilities.origine` and `probabilities.repeint`: probabilities returned for the two classes;
- `model_version`: model version identifier;
- `is_experimental`: indicates that the result is experimental;
- `cropped_image`: central image encoded as a data URL, if it could be generated.

The probabilities and verdict are outputs of the model and its current decision rule. They do not constitute absolute proof that a panel has been repainted.

### `GET /health`

Returns `{"status":"ok"}` to confirm that the service has started.

## Configuration

### Model Path

By default, the backend looks for the model at the following location:

```text
backend/models/paint/efficientnet_binaire_phase2_best.keras
```

The `PAINT_MODEL_PATH` environment variable can be used to specify another file. A relative path is resolved from the `backend/` directory; an absolute path can also be provided.

PowerShell example:

```powershell
$env:PAINT_MODEL_PATH = "C:/models/my_model.keras"
python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

The expected model must be compatible with the inference code, particularly regarding the class order: index 0 for `origine` and index 1 for `repeint`. The backend also checks for the expected preprocessing layers when loading the model.

### CORS (Allowed Frontend Origins)

The backend uses `PAINT_ALLOWED_ORIGINS`, a comma-separated list of origins. When defined with a non-empty value, this list replaces the default allowed origins.

By default, the current code allows the following frontend origins:

- `http://localhost:3000`
- `http://127.0.0.1:3000`

For local development, the frontend uses one of these two origins on port `3000`.

PowerShell example to allow only the two local frontend origins:

```powershell
$env:PAINT_ALLOWED_ORIGINS = "http://localhost:3000,http://127.0.0.1:3000"
python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

**CORS and the API URL are two different configurations.** In `PaintInspection.jsx`, `PAINT_API_BASES` currently contains `http://127.0.0.1:8000` and `http://localhost:8000`. For deployment, this list must also be adapted or made configurable so that it points to the actually deployed API.

## Tests

From the repository root:

```powershell
python -m pip install -r backend/requirements-dev.txt
python -m pytest tests/backend/test_paint_predict_contract.py
```

These commands assume that `backend/requirements-dev.txt` and the specified test file are present in the repository.

## Troubleshooting

### The API Does Not Start

- Make sure the virtual environment is activated and the dependencies listed in `backend/requirements.txt` are installed.
- Run Uvicorn from the repository root using `backend.main:app`, as shown in the commands above.
- Check that port 8000 is not already in use.

### Error Indicating That the Model Cannot Be Found or Read

- Check the path to the `.keras` file.
- If the model is managed by Git LFS, run `git lfs pull` and make sure the downloaded file is the complete model, not just an LFS pointer file.
- Check that the model matches the architecture and preprocessing layers expected by `paint_analysis.py`.

### The Browser Blocks the API Request

- Make sure the backend is listening on port 8000.
- Open the frontend from an origin allowed by `PAINT_ALLOWED_ORIGINS`.
- Check the addresses in `PAINT_API_BASES` in `PaintInspection.jsx`.
- Check the browser console and backend logs to distinguish between a CORS error, a network error, or an HTTP response error.

### The Frontend Cannot Load the React/Babel Libraries

The provided frontend loads these libraries from a CDN. Check your Internet connection or configure the frontend to serve these dependencies locally.

## Data, Privacy, and Publication

Research data may contain vehicle images and information collected during field activities. Before making anything publicly available:

- Verify that distribution of the code, model, weights, notebooks, results, and images is authorized.
- Remove confidential images, customer data, and any information that could identify a vehicle or an individual.
- Do not publish API keys, `.env` files, credentials, or secrets.
- Also check the Git history, since deleting a file from the latest commit does not necessarily remove it from the repository history.
- Make sure `.gitignore` excludes secrets, virtual environments, caches, and data that should not be shared.

The model is managed using Git LFS. Verify redistribution rights before making it publicly accessible.

## Limitations

This system is experimental and depends on the dataset, image acquisition conditions, lighting, focusing, and the surfaces being examined. A prediction of `origine` or `repeint` should be interpreted as a model estimate, not as a certification. An `incertain` prediction indicates that further verification is recommended.
