# RAMBO bot
Our Discord bot, its name is Rambo

## Requirements
In able to compile and run project, make sure `python@3.10` and `poetry@1.2.2` or above are installed.

Clone repository by `git clone` to your local computer:
```shell script
$ git clone git@github.com:samothrakii/rambo-bot.git
$ cd rambo-bot
```

You need to add these following environment variables to `.env` (recommended) or `~/.profile` file
```
PORT=[server_port]
TOKEN=[bot_token]
MONGO_URI=[mongodb_uri]
APP_ID=[application_id]
GUILD_ID=[target_guild_id]
CHANNEL_ID=[target_channel_id]
DEV_CHANNEL_ID=[dev_channel_id]
```

## Build and run
Install all dependencies:
```shell script
$ poetry install
```
Compile and run your bot:
```shell script
$ poetry run uvicorn main:app --reload
```

NOTE: Install `poethepoet` to be able to run poe tasks, it will save your time.
```shell script
$ python -m pip install poethepoet
$ poe start # poetry run uvicorn main:app --reload
```

## References
[FastAPI](https://fastapi.tiangolo.com) \
[Poetry](https://python-poetry.org/)
