import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { Command } from "../interface/Command";
import { getAllFootballBets } from "../module/footballBetCrud";

export const membet: Command = {
  data: new SlashCommandBuilder()
    .setName('membet')
    .setDescription('List all football bets that not yet completed')
    .addStringOption((option) =>
      option.setName('alias')
        .setDescription('Alias of member in this channel')
        .setRequired(false)),
  run: async (interaction) => {
    await interaction.deferReply();
    const { user } = interaction;

    const alias = interaction.options.getString('alias', false);
    let bets = await getAllFootballBets();
    if (alias) {
      bets = bets.filter(b => b.home.bettor.includes(alias) || b.away.bettor.includes(alias));
    }

    const msg = new MessageEmbed();
    if (bets.length > 0) {
      msg.setTitle(alias ? `All uncompleted bets of ${alias}` : 'All uncompleted bets');
      msg.setDescription('List of all football bets that not yet completed');
      bets.forEach(b => msg.addFields({
        name: `Match ID: ${b._id}`,
        value: `Corresponding bettor: ${b.home.name} - ${b.home.bettor.join(', ')} vs ${b.away.name} - ${b.away.bettor.join(', ')}`,
        inline: false
      }));
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
