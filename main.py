from fastapi import FastAPI
import requests
from core.config import settings

app = FastAPI()

async def ping():
    url = f"https://discord.com/api/v10/applications/{settings.APP_ID}/commands"

    # This is an example CHAT_INPUT or Slash Command, with a type of 1
    json = {
        "name": "blep",
        "type": 1,
        "description": "Send a random adorable animal photo",
        "options": [
            {
                "name": "animal",
                "description": "The type of animal",
                "type": 3,
                "required": True,
                "choices": [
                    {
                        "name": "Dog",
                        "value": "animal_dog"
                    },
                    {
                        "name": "Cat",
                        "value": "animal_cat"
                    },
                    {
                        "name": "Penguin",
                        "value": "animal_penguin"
                    }
                ]
            },
            {
                "name": "only_smol",
                "description": "Whether to show only baby animals",
                "type": 5,
                "required": False
            }
        ]
    }

    # For authorization, you can use either your bot token
    headers = {
        "Authorization": f"Bot {settings.TOKEN}"
    }

    r = requests.post(url, headers=headers, json=json)
    print(r.json())
    r.close()


@app.get("/")
async def root():
    await ping()
    return {"message": "Hello World"}

