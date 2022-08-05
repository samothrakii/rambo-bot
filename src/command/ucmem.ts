import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import MemberModel from "../db/model/MemberModel";
import { Command } from "../interface/Command";
import { createOrUpdateMemberRecord } from "../module/memberCrud";

export const ucmem: Command = {
  data: new SlashCommandBuilder()
    .setName('ucmem')
    .setDescription('Create new member or update existed one')
    .addStringOption((option) =>
      option.setName('alias')
        .setDescription('Alias of member in this channel')
        .setRequired(true))
    .addStringOption((option) =>
      option.setName('discord_id')
        .setDescription('Discord ID of member in this channel')
        .setRequired(true))
    .addStringOption((option) =>
      option.setName('steam_id')
        .setDescription('Steam ID of member in this channel')
        .setRequired(true)),
  run: async (interaction) => {
    await interaction.deferReply();
    const { user } = interaction;

    const alias = interaction.options.getString('alias', true);
    const discordId = interaction.options.getString('discord_id', true);
    const steamId = interaction.options.getString('steam_id', true);

    const member = await createOrUpdateMemberRecord(new MemberModel({
      alias, discordId, steamId, quotes: []
    }));

    const msg = new MessageEmbed();
    if (member) {
      msg.setTitle(`Welcome ${member.alias}!`);
      msg.setDescription(`Your ID that I remember is ${member._id}`);
      msg.addFields({ name: 'Discord ID', value: member.discordId, inline: true });
      msg.addFields({ name: 'Steam ID', value: member.steamId, inline: true });
    } else {
      msg.setTitle('Failed');
      msg.setDescription(
        `Could not create this member, either it's already exists or some error occurred :(`
      );
    }

    msg.setAuthor({
      name: user.tag,
      iconURL: user.displayAvatarURL(),
    });

    await interaction.editReply({ embeds: [msg] });
  }
}
