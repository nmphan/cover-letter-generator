# This is the main entry point of the FastAPI application.
# It defines the API endpoints and handles HTTP requests.
# It connects to the database, processes business logic, and returns responses.

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from .api.routes import router

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
