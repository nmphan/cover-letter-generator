# # This is the main entry point of the FastAPI application.
# # It defines the API endpoints and handles HTTP requests.
# # It connects to the database, processes business logic, and returns responses.

# from fastapi import FastAPI
# from starlette.middleware.cors import CORSMiddleware

# from app.api.routes import router

# app = FastAPI()


# # Configure CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Include API routes
# app.include_router(router)

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="127.0.0.1", port=8000)


from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from app.api.routes import router
from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI(
#     title="Cover Letter Generator API",
#     description="API for generating personalized cover letters",
#     version="1.0.0"
# )

# # Root endpoint
# @app.get("/")
# async def root():
#     return {
#         "message": "Welcome to Cover Letter Generator API",
#         "documentation": {
#             "swagger": "/docs",
#             "redoc": "/redoc"
#         },
#         "endpoints": {
#             "resumes": "/api/resumes",
#             "jobs": "/api/jobs",
#             "letters": "/api/letters"
#         }
#     }

# # Configure CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Include API routes
# app.include_router(router, prefix="/api")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        # "http://localhost:3000",  # React dev server
        # "https://your-frontend-domain.com"  # Production
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
# app.include_router(router, prefix="/api")
app.include_router(router) 

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=os.getenv("HOST", "0.0.0.0"), port=int(os.getenv("PORT", 8000)))