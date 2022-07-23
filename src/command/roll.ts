import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { Command } from "../interface/Command";

export const roll: Command = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Rolling dices')
    .addIntegerOption((option) =>
      option.setName('quantity')
        .setDescription('The number of dices you want to roll')
        .setRequired(true)),
  run: async (interaction) => {
    await interaction.deferReply();

    const sides = 6;
    const { user } = interaction;

    const qty = interaction.options.getInteger('quantity', true);
    const arr = Array.from({ length: qty }, () => Math.floor(Math.random() * (sides + 1)));

    const msg = new MessageEmbed();
    msg.setTitle('They see me rollin');
    msg.setDescription(`They hatin... ${arr.join(', ')}`);
    msg.setAuthor({
      name: user.tag,
      iconURL: user.displayAvatarURL(),
    });

    await interaction.editReply({ embeds: [msg] });
  }
}
