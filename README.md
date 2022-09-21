# RAMBO bot
My Discord bot, its name is Rambo

## Requirements
In able to compile and run project, make sure `node@16` and `npm@8` or above is installed.

Clone repository by `git clone` to your local computer:
```shell script
$ git clone git@github.com:khoarx/rambo-bot.git
$ cd rambo-bot
```

You need to add these following environment variables to `.env` (recommended) or `~/.profile` file
```
TOKEN=[BOT_TOKEN]
MONGO_URI=[MONGODB_URI]
APP_ID=[APPLICATION_ID]
GUILD_ID=[TARGET_GUILD_ID]
CHANNEL_ID=[TARGET_CHANNEL_ID]
```

## Build and run
Install all dependencies:
```shell script
$ npm install
```
Compile and run your bot:
```shell script
$ npm run build
$ npm start
```

## References
[discord.js](https://discord.js.org/)
