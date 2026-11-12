import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGODB_URI: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "ecotrace"
    AI_PROVIDER: str = "demo"
    FRONTEND_URL: str = "http://localhost:5173"
    
    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
