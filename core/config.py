"""
Base setting class
Checkout this link for more info: https://pydantic-docs.helpmanual.io/usage/settings
"""
from pydantic import BaseSettings


class Settings(BaseSettings):
    TOKEN: str
    MONGO_URI: str
    APP_ID: str

    class Config:
        case_sensitive = True
        env_file = ".env"
        env_file_encoding = "utf-8"
        fields = {
            "TOKEN": {"env": "TOKEN"},
            "MONGO_URI": {"env": "MONGO_URI"},
            "APP_ID": {"env": "APP_ID"},
        }


settings = Settings()
