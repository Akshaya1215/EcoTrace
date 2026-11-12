from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import ai, listings, pickups, transactions, users, analytics
from app.config import settings

app = FastAPI(
    title="EcoTrace AI API",
    description="Backend API for EcoTrace AI E-Waste Recycling Marketplace",
    version="1.0.0"
)

# Configure CORS — allow localhost for dev and the deployed frontend URL for prod
allowed_origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    settings.FRONTEND_URL,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(ai.router, prefix="/api")
app.include_router(listings.router, prefix="/api")
app.include_router(pickups.router, prefix="/api")
app.include_router(transactions.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(analytics.router, prefix="/api")

@app.get("/")
async def root():
    return {
        "message": "Welcome to EcoTrace AI API",
        "status": "online",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
