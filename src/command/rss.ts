import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { Command } from "../interface/Command";
import { getRssByName } from "../module/rssCrud";

const RssParser = require('rss-parser');

export const rss: Command = {
  data: new SlashCommandBuilder()
    .setName('rss')
    .setDescription('Get RSS from given name')
    .addStringOption((option) =>
      option.setName('name')
        .setDescription('Name of saved RSS')
        .setRequired(true)),
  run: async (interaction) => {
    await interaction.deferReply();
    const { user } = interaction;

    const name = interaction.options.getString('name', true);
    const rss = await getRssByName(name);

    let msgList: MessageEmbed[] = [];
    if (rss) {
      const rssParser = new RssParser();
      const feeds = await rssParser.parseURL(rss.link);

      if (feeds.items) {
        msgList = feeds.items.slice(3, 13).map((feed: any) => {
          const msg = new MessageEmbed();
          msg.setTitle(feed.title);
          msg.setDescription(feed.contentSnippet);
          msg.addFields({ name: 'Chi tiết: ', value: feed.link, inline: true });
          return msg;
        });
      }
    }

    if (!msgList || msgList.length === 0) {
      const msg = new MessageEmbed();
      msg.setTitle('Failed');
      msg.setDescription(
        `Could not fetch this RSS, either it's not exists or some error occurred :(`
      );
      msgList = [msg];
    }

    user.send({ embeds: msgList });
    await interaction.editReply({
      embeds: [{
        title: 'Done',
        description: 'Check your DM!',
      }]
    });
  }
}
