import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import RssModel from "../db/model/RssModel";
import { Command } from "../interface/Command";
import { createOrUpdateRssRecord } from "../module/rssCrud";

export const addrss: Command = {
  data: new SlashCommandBuilder()
    .setName('addrss')
    .setDescription('Create new RSS or update existed one')
    .addStringOption((option) =>
      option.setName('name')
        .setDescription('Name of this RSS')
        .setRequired(true))
    .addStringOption((option) =>
      option.setName('link')
        .setDescription('RSS link')
        .setRequired(true)),
  run: async (interaction) => {
    await interaction.deferReply();

    const { user } = interaction;

    const name = interaction.options.getString('name', true);
    const link = interaction.options.getString('link', true);

    const rss = await createOrUpdateRssRecord(new RssModel({ name, link }));

    const msg = new MessageEmbed();
    if (rss) {
      msg.setTitle(`RSS ${rss.name} is created!`);
      msg.setDescription('You will get update from this RSS every day!');
    } else {
      msg.setTitle('Failed');
      msg.setDescription(
        `Could not create this RSS, either it's already exists or some error occurred :(`
      );
    }

    msg.setAuthor({
      name: user.tag,
      iconURL: user.displayAvatarURL(),
    });

    await interaction.editReply({ embeds: [msg] });
  }
}
