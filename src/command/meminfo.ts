import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { Command } from "../interface/Command";
import { findByAlias } from "../module/memberCrud";

export const meminfo: Command = {
  data: new SlashCommandBuilder()
    .setName('meminfo')
    .setDescription('Info of specific member')
    .addStringOption((option) =>
      option.setName('alias')
        .setDescription('Alias of member in this channel')
        .setRequired(true)),
  run: async (interaction) => {
    await interaction.deferReply();
    const { user } = interaction;

    const alias = interaction.options.getString('alias', true);
    const member = await findByAlias(alias);

    const msg = new MessageEmbed();
    if (member) {
      msg.setTitle(`Member ${member.alias} info`);
      msg.setDescription(`ID: ${member._id}`);
      msg.addFields({ name: 'Discord ID', value: member.discordId, inline: false });
      msg.addFields({ name: 'Steam ID', value: member.steamId, inline: false });
      msg.addFields({ name: 'Current Debt', value: member.debt.toString(), inline: false });
    } else {
      msg.setTitle('Failed');
      msg.setDescription(
        `Could not get member info, either it's not exists or some error occurred :(`
      );
    }

    msg.setAuthor({
      name: user.tag,
      iconURL: user.displayAvatarURL(),
    });

    await interaction.editReply({ embeds: [msg] });
  }
}
