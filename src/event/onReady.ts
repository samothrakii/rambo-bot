import { REST } from '@discordjs/rest';
import { Client, TextChannel } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import { commandList } from '../command/_CommandList';
import { ActivityTypes } from 'discord.js/typings/enums';
import { ACTIVITY_TYPES, COMPETING_LIST, PLAYING_LIST, WATCHING_LIST } from '../util/constant';

const CronJob = require('cron').CronJob;

export const onReady = async (bot: Client) => {
  const rest = new REST({ version: '9' }).setToken(
    process.env.TOKEN as string
  );

  const cmds = commandList.map((cmd) => cmd.data.toJSON());

  await rest.put(
    Routes.applicationGuildCommands(
      bot.user?.id || process.env.APP_ID as string,
      process.env.GUILD_ID as string
    ),
    { body: cmds }
  )

  if (bot.user) {
    setInterval(async () => {
      let activity = ACTIVITY_TYPES[Math.floor(Math.random() * (ACTIVITY_TYPES.length))];
      let name: string;

      switch (activity) {
        case ActivityTypes.WATCHING:
          name = WATCHING_LIST[Math.floor(Math.random() * (WATCHING_LIST.length))];
          break;
        case ActivityTypes.COMPETING:
          name = COMPETING_LIST[Math.floor(Math.random() * (COMPETING_LIST.length))];
          break;
        case ActivityTypes.PLAYING:
          name = PLAYING_LIST[Math.floor(Math.random() * (PLAYING_LIST.length))];
          break;
        default:
          activity = ActivityTypes.LISTENING;
          name = 'Spotify'
          break;
      }

      if (bot.user) {
        try {
          bot.user.setPresence({
            activities: [{
              name: name,
              type: activity,
            }]
          });
        } catch (err) {
          console.error(err);
        }
      }
    }, 900 * 1000);

    console.log(`${bot.user.tag} is connected!`);
  } else {
    console.log('Discord ready!');
  }

  if (bot.channels) {
    const channel = await bot.channels.fetch(
      process.env.CHANNEL_ID as string,
      { allowUnknownGuild: false }
    ) as TextChannel;

    if (channel) {
      let job = new CronJob('00 05 21 * * *', () => {
        channel.send('Tới giờ tắm giếng mỗi ngày rùi @everyone ei');
      }, null, true, 'Asia/Ho_Chi_Minh');
      job.start();
    }
  }
};

