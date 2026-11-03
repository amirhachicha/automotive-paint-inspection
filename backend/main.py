import os
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

try:
    from .paint_analysis import paint_router
except ImportError:
    from paint_analysis import paint_router


app = FastAPI(
    title="Qualification des pièces repeintes",
    description="API expérimentale de classification de peinture automobile.",
    version="1.0.0",
)

allowed_origins = [
    origin.strip()
    for origin in os.getenv(
        "PAINT_ALLOWED_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")
    if origin.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(paint_router)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


frontend_directory = Path(__file__).resolve().parent.parent / "frontend"
if frontend_directory.is_dir():
    @app.get("/paint-inspection", include_in_schema=False)
    async def paint_inspection_page():
        return FileResponse(frontend_directory / "index.html")

    app.mount("/", StaticFiles(directory=str(frontend_directory), html=True), name="frontend")
