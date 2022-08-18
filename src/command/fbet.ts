import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import FootbalBetModel from "../db/model/FootbalBetModel";
import { Command } from "../interface/Command";
import { createFootbalBetRecord } from "../module/footballBetCrud";
import { getAllMembers } from "../module/memberCrud";

export const fbet: Command = {
  data: new SlashCommandBuilder()
    .setName('fbet')
    .setDescription('Create a football bet')
    .addNumberOption((option) =>
      option.setName('amount')
        .setDescription('Bet amount')
        .setRequired(true))
    .addStringOption((option) =>
      option.setName('home_name')
        .setDescription('Name of home team')
        .setRequired(true))
    .addStringOption((option) =>
      option.setName('home_bettor')
        .setDescription('List of home bettor, you can add 1 or more separated by comma')
        .setRequired(true))
    .addStringOption((option) =>
      option.setName('away_name')
        .setDescription('Name of home team')
        .setRequired(true))
    .addStringOption((option) =>
      option.setName('away_bettor')
        .setDescription('List of away team bettor, you can add 1 or more separated by comma')
        .setRequired(true))
    .addNumberOption((option) =>
      option.setName('home_odds')
        .setDescription('Odds of home team, default is 0')
        .setRequired(false))
    .addNumberOption((option) =>
      option.setName('away_odds')
        .setDescription('Odds of away team, default is 0')
        .setRequired(false)),
  run: async (interaction) => {
    await interaction.deferReply();
    const { user } = interaction;

    const amount = interaction.options.getNumber('amount', true);

    const homeName = interaction.options.getString('home_name', true);
    const homeBettor = interaction.options.getString('home_bettor', true)
      .split(',').map(s => s.trim());
    const homeOdds = interaction.options.getNumber('home_odds', false) || 0.0;

    const awayName = interaction.options.getString('away_name', true);
    const awayBettor = interaction.options.getString('away_bettor', true)
      .split(',').map(s => s.trim());
    const awayOdds = interaction.options.getNumber('away_odds', false) || 0.0;

    const members = (await getAllMembers()).map(m => m.alias);
    const msg = new MessageEmbed();

    if (!homeBettor.every(m => members.includes(m))) {
      msg.setTitle('Failed');
      msg.setDescription(`Home bettor must be one of ${members.join(', ')}`);
    } else if (!awayBettor.every(m => members.includes(m))) {
      msg.setTitle('Failed');
      msg.setDescription(`Away bettor must be one of ${members.join(', ')}`);
    } else if (homeBettor.some(m => awayBettor.includes(m))) {
      msg.setTitle('Failed');
      msg.setDescription('Home bettor cannot be the same as away bettor');
    } else if (homeName === awayName) {
      msg.setTitle('Failed');
      msg.setDescription('Home and away team cannot be the same');
    } else {
      const bet = await createFootbalBetRecord(new FootbalBetModel({
        completed: false,
        amount,
        home: { name: homeName, odds: homeOdds, bettor: homeBettor },
        away: { name: awayName, odds: awayOdds, bettor: awayBettor },
        result: { home: 0, away: 0 },
      }));

      if (bet) {
        msg.setTitle(`Match between ${bet.home.name} and ${bet.away.name}!`);
        msg.setDescription(`With the following odds ${bet.home.odds} : ${bet.away.odds}`);
        msg.addFields({ name: `${bet.home.name}'s bettor`, value: bet.home.bettor.join(', '), inline: true });
        msg.addFields({ name: `${bet.away.name}'s bettor`, value: bet.away.bettor.join(', '), inline: true });
      } else {
        msg.setTitle('Failed');
        msg.setDescription(
          `Could not create bet, either it's already exists or some error occurred :(`
        );
      }

      msg.setAuthor({
        name: user.tag,
        iconURL: user.displayAvatarURL(),
      });
    }
    await interaction.editReply({ embeds: [msg] });
  }
}
