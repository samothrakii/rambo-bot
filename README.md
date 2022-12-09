# RAMBO bot
Our Discord bot, its name is Rambo

## Requirements
In able to compile and run project, make sure `go1.19` or above is installed.

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

## Build and run Go
Install all dependencies:
```shell script
$ cd go
$ go mod download
```
Compile and run your bot:
```shell script
$ go run src/main.go
```

## References
[Gin](https://github.com/gin-gonic/gin)
