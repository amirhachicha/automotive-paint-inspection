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

## Live Render Deployment

The application is available online at:

- Web interface: https://automotive-paint-inspection.onrender.com/
- Health check: https://automotive-paint-inspection.onrender.com/health

### Deployment Limitations

- The uploaded image must be JPEG or PNG and must not exceed **10 MiB**.
- The Render service currently uses the **Free plan** and may spin down after inactivity.
- After inactivity, the first request may take longer while Render restarts the service.
- The Free instance is limited to **512 MB of RAM**. TensorFlow may require additional memory, and simultaneous analyses can trigger an out-of-memory restart.
- Opening the website on several devices is supported, but each device shares the same service and resource limits.

## Project Structure

```text
automotive-paint-inspection/
├── backend/
│   ├── main.py
│   ├── paint_analysis.py
│   ├── requirements.txt
│   └── models/
│       └── paint/
│           └── efficientnet_binaire_phase2_best.keras
├── frontend/
│   └── ...
├── repainted model/
├── docs/
│   └── requirements/paint_defects/
├── tests/
│   └── backend/
│       └── test_paint_predict_contract.py
├── .gitignore
├── README.md
├── render.yaml
├── principale_code_local.ipynb
└── principale_code.ipynb

```

The exact structure may vary depending on the files available in the repository. Do not publish datasets, internal reports, or code originating from another project without first verifying that their distribution is authorized.

## Prerequisites

- Ubuntu 24.04 running through WSL2 (recommended development environment).
- Python 3.14.5.
- `uv` for Python environment and package management.
- Visual Studio Code with the Remote - WSL extension.
- NVIDIA GPU with CUDA support (optional, for local GPU acceleration).
- Node.js 18 or later and npm.
- Git and Git LFS, if the model is distributed using Git LFS.

## Environment Installation

### 1. Install uv

From the Ubuntu WSL terminal:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh

```

### 2. Create the Python Environment

Install Python 3.14.5 and create the shared virtual environment:

```bash
uv python install 3.14.5

uv venv ~/.venvs/ai-global --python 3.14.5

source ~/.venvs/ai-global/bin/activate

```

### 3. Install Dependencies

From the repository root:

```bash
uv pip install -r backend/requirements.txt

```

Install Jupyter support:

```bash
uv pip install jupyterlab notebook ipykernel ipywidgets

```

Register the environment as a Jupyter kernel:

```bash
python -m ipykernel install --user \
    --name ai-global \
    --display-name "Python 3.14.5 (ai-global)"

```

In VS Code, select the `ai-global` Python interpreter and use the **Python 3.14.5 (ai-global)** kernel for notebooks.

**Note:** The shared environment can be reused across projects. Check dependency compatibility before changing existing package versions.

## Jupyter Notebook Execution

The project provides two notebooks for training, experimentation, and performance evaluation.

You can choose between local GPU execution and Google Colab, depending on your available hardware.

### Model Training and Performance Evaluation

Before running the web application, the trained EfficientNet-B0 model must be generated.

Choose the notebook according to your execution environment:

| Execution environment   | Notebook                      |
| ----------------------- | ----------------------------- |
| Google Colab            | `principale_code.ipynb`       |
| Local NVIDIA GPU (CUDA) | `principale_code_local.ipynb` |

Both notebooks are intended for model training, evaluation, and performance analysis.

The workflow is:

1. Open the appropriate notebook.
2. Configure the dataset paths and required dependencies.
3. Execute the notebook to train EfficientNet-B0.
4. Review the training results and model performance.
5. Generate and save the trained model.

The expected output model is:

```text
backend/models/paint/efficientnet_binaire_phase2_best.keras

```

This model is subsequently used by the FastAPI backend for image inference.

### Option 1 — Local Execution with an NVIDIA GPU

If you have a sufficiently powerful NVIDIA GPU, you can execute the training notebook locally using CUDA acceleration.

Requirements:

- NVIDIA GPU with sufficient VRAM.
- NVIDIA drivers with WSL2 CUDA support.
- Ubuntu 24.04 running through WSL2.
- CUDA-enabled TensorFlow or PyTorch installation.

To verify GPU availability with PyTorch:

```python
import torch

print("PyTorch:", torch.__version__)
print("CUDA available:", torch.cuda.is_available())

if torch.cuda.is_available():
    print("GPU:", torch.cuda.get_device_name(0))

```

Open `principale_code_local.ipynb` in VS Code and select the `Python 3.14.5 (ai-global)` kernel.

Execute the notebook to train the model, evaluate its performance, and generate the `.keras` model file.

**Note:** GPU memory requirements depend on the model architecture, batch size, image resolution, and dataset size. Adjust the batch size if GPU memory is insufficient.

### Option 2 — Google Colab

If your computer does not have a sufficiently powerful GPU, you can use **Google Colab** to execute the training notebook using hosted GPU resources.

Steps:

1. Upload `principale_code.ipynb` to [https://colab.research.google.com/](https://colab.research.google.com/).
2. Open **Runtime → Change runtime type**.
3. Select an available GPU, such as NVIDIA T4.
4. Install the required project dependencies.
5. Upload the dataset or connect Google Drive.
6. Configure the dataset paths.
7. Execute the notebook to train and evaluate the model.
8. Download the generated `efficientnet_binaire_phase2_best.keras` file.
9. Place the model in `backend/models/paint/`.

Google Colab provides access to GPU computing without requiring a local CUDA installation. GPU availability and usage limits depend on your Colab plan and current resource availability.

**Recommendation:** Use local execution if you have a sufficiently powerful NVIDIA GPU and want full control over your environment. Otherwise, Google Colab is a convenient alternative for model training and experimentation.

## Installation and Local Setup

The following instructions assume that the project is opened in VS Code connected to Ubuntu through WSL2.

Open two integrated WSL terminals from the repository root.

### 1. Install Backend Dependencies

Activate the shared Python environment:

```bash
source ~/.venvs/ai-global/bin/activate

```

Install backend dependencies:

```bash
uv pip install -r backend/requirements.txt

```

If the model is tracked using Git LFS, retrieve its contents after cloning the repository:

```bash
git lfs install
git lfs pull

```

Make sure the generated model exists at:

```text
backend/models/paint/efficientnet_binaire_phase2_best.keras

```

### 2. Start the Backend

In the first terminal:

```bash
source ~/.venvs/ai-global/bin/activate

cd backend

python -m uvicorn main:app --host 127.0.0.1 --port 8000

```

The API is available at:

- API: http://127.0.0.1:8000
- Health check: http://127.0.0.1:8000/health
- Interactive API documentation: http://127.0.0.1:8000/docs

The model is loaded when the first prediction is requested. Therefore, the first request may take longer than subsequent requests.

### 3. Start the Frontend

In the second terminal, from the repository root:

```bash
cd frontend

npm install
npm run dev

```

Open:

http://localhost:3000/paint-inspection

Node.js and npm must be installed and available inside the WSL environment.

The provided interface loads React and Babel from a CDN. Therefore, an Internet connection is required if these libraries are not served locally.

The development server serves the application at this address and returns the main page for `/paint-inspection`.

## Paint Inspection API

### `POST /paint/predict`

Sends an image to the model to obtain a prediction.

- Request type: `multipart/form-data`.
- File field name: `file`.
- Accepted formats: JPEG and PNG (`image/jpeg`, `image/png`).
- Maximum file size: 10 MiB (approximately 10.5 decimal MB).

Example using curl from WSL:

```bash
curl -X POST "http://127.0.0.1:8000/paint/predict" \
    -F "file=@/path/to/image.jpg"

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

By default, the backend looks for the model at:

```text
backend/models/paint/efficientnet_binaire_phase2_best.keras

```

The `PAINT_MODEL_PATH` environment variable can be used to specify another file. A relative path is resolved from the `backend/` directory; an absolute path can also be provided.

Bash example:

```bash
export PAINT_MODEL_PATH="$HOME/models/my_model.keras"

cd backend
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000

```

The expected model must be compatible with the inference code, particularly regarding the class order: index 0 for `origine` and index 1 for `repeint`. The backend also checks for the expected preprocessing layers when loading the model.

### CORS (Allowed Frontend Origins)

The backend uses `PAINT_ALLOWED_ORIGINS`, a comma-separated list of origins. When defined with a non-empty value, this list replaces the default allowed origins.

By default, the current code allows:

- `http://localhost:3000`
- `http://127.0.0.1:3000`

For local development, the frontend uses one of these two origins on port `3000`.

Bash example:

```bash
export PAINT_ALLOWED_ORIGINS="http://localhost:3000,http://127.0.0.1:3000"

cd backend
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000

```

**CORS and the API URL are two different configurations.** In `PaintInspection.jsx`, `PAINT_API_BASES` currently contains `http://127.0.0.1:8000` and `http://localhost:8000`. For deployment, this list must also be adapted or made configurable so that it points to the actually deployed API.

## Tests

From the repository root, with the Python environment activated:

```bash
source ~/.venvs/ai-global/bin/activate

uv pip install -r backend/requirements-dev.txt

python -m pytest tests/backend/test_paint_predict_contract.py

```

These commands assume that `backend/requirements-dev.txt` and the specified test file are present in the repository.

## Troubleshooting

### The API Does Not Start

- Make sure the Python environment is activated and the dependencies listed in `backend/requirements.txt` are installed.
- Run Uvicorn from the `backend/` directory using `main:app`.
- Check that port 8000 is not already in use.

### Error Indicating That the Model Cannot Be Found or Read

- Check the path to the `.keras` file.
- If the model is managed by Git LFS, run `git lfs pull` and make sure the downloaded file is the complete model, not just a Git LFS pointer file.
- If the model has not yet been generated, execute the appropriate training notebook.
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
