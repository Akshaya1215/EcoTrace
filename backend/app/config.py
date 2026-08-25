import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGODB_URI: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "ecotrace"
    AI_PROVIDER: str = "demo"
    
    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
