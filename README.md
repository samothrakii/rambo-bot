# discord-bot
My Discord bot, its name is Rambo

## Requirements
In able to compile and run project, make sure `node@16` and `npm@8` or above is installed.

Clone repository by `git clone` to your local computer:
```shell script
$ git clone git@github.com:Sam0thrace/discord-bot.git
$ cd discord-bot
```

You need to add these following environment variables to `.env` (recommended) or `~/.profile` file
```
TOKEN=${your-discord-bot-token}
MONGO_URI=${your-mongodb-uri}
APP_ID=${your-discord-bot-application-id}
GUILD_ID=${your-target-guild-id}
CHANNEL_ID=${your-target-channel-id}
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
