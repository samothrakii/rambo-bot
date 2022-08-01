import { REST } from '@discordjs/rest';
import { Client, MessageEmbed, TextChannel, EmbedFieldData } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import { commandList } from '../command/_CommandList';
import { ActivityTypes } from 'discord.js/typings/enums';
import { ACTIVITY_TYPES, COMPETING_LIST, PLAYING_LIST, WATCHING_LIST } from '../util/constant';
import { getAllRss } from '../module/rssCrud';

const CronJob = require('cron').CronJob;
const RssParser = require('rss-parser');

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
      let dotaJob = new CronJob('00 00 21 * * *', () => {
        channel.send('Tới giờ tắm giếng mỗi ngày rùi @everyone ei');
      }, null, true, 'Asia/Ho_Chi_Minh');
      dotaJob.start();
      console.log('DotaJob started');

      let newsJob = new CronJob('00 00 09,18 * * *', async () => {
        const rssList = await getAllRss();
        const rssParser = new RssParser();
        for (let rss of rssList) {
          const feeds = await rssParser.parseURL(rss.link);

          let title = rss.name;
          if (feeds.title) {
            title = feeds.title;
          }

          if (feeds.items) {
            const msgList: MessageEmbed[] = feeds.items.slice(0, 3).map((feed: any) => {
              const msg = new MessageEmbed();
              msg.setTitle(feed.title);
              msg.setDescription(feed.contentSnippet);
              msg.addFields({ name: 'Chi tiết: ', value: feed.link, inline: true });
              return msg;
            });
            msgList.push(new MessageEmbed({
              description: `Use \`/rss ${rss.name}\` command to get more feeds!`,
            }));
            channel.createWebhook(title, { avatar: bot.user?.displayAvatarURL() })
              .then(h => h.send({ embeds: msgList }))
              .finally(() => channel.fetchWebhooks().then(h => h.forEach(w => w.delete())));
          }
        }
      }, null, true, 'Asia/Ho_Chi_Minh');
      newsJob.start();
      console.log('NewsJob started');
    }

    const devChannel = await bot.channels.fetch(
      process.env.DEV_CHANNEL_ID as string,
      { allowUnknownGuild: false }
    ) as TextChannel;

    if (devChannel) {
      let dailyUpdateJob = new CronJob('00 00 19 * * *', () => {
        devChannel.send(`Hi @dev, Have you had any obstacle yesterday? Please raise here, let others help you.`);
      }, null, true, 'Asia/Ho_Chi_Minh');
      dailyUpdateJob.start();
      console.log('DailyUpdateJob started');
    }
  }
};

