import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { Command } from "../interface/Command";
import { Member } from "../interface/Member";
import { findById } from "../module/footballBetCrud";
import { findByAliases } from "../module/memberCrud";

export const fbetrs: Command = {
  data: new SlashCommandBuilder()
    .setName('fbetrs')
    .setDescription('Set football bet result')
    .addStringOption((option) =>
      option.setName('id')
        .setDescription('Match ID')
        .setRequired(true))
    .addNumberOption((option) =>
      option.setName('home')
        .setDescription('Home team score')
        .setRequired(true))
    .addNumberOption((option) =>
      option.setName('away')
        .setDescription('Away team score')
        .setRequired(true)),
  run: async (interaction) => {
    await interaction.deferReply();
    const { user } = interaction;

    const matchId = interaction.options.getString('id', true);
    let homeScore: number = interaction.options.getNumber('home', true);
    let awayScore: number = interaction.options.getNumber('away', true);

    const msg = new MessageEmbed();
    const bet = await findById(matchId);

    if (bet) {
      const members = await findByAliases(bet.home.bettor.concat(bet.away.bettor));
      const map = new Map(members.map((obj: Member) => [obj.alias, obj]));

      bet.result.home = homeScore;
      bet.result.away = awayScore;
      bet.completed = true;

      homeScore = homeScore * bet.home.odds;
      awayScore = awayScore * bet.away.odds;

      let desc = 'Match draw no one win!';
      if (homeScore > awayScore) {
        bet.away.bettor.forEach(async (b) => {
          const member = map.get(b);
          if (member) {
            member.debt += bet.amount;
            member.save();
          }
        });
        desc = `${bet.home.bettor} win!`;
      } else if (homeScore < awayScore) {
        bet.home.bettor.forEach(async (b) => {
          const member = map.get(b);
          if (member) {
            member.debt += bet.amount;
            member.save();
          }
        });
        desc = `${bet.away.bettor} win!`;
      }

      msg.setTitle(`Result of match ${bet.home.name} and ${bet.away.name}!`);
      msg.setDescription(desc);
      bet.save();
    } else {
      msg.setTitle('Failed');
      msg.setDescription(
        `Could not update match result, some error occurred :(`
      );
    }

    msg.setAuthor({
      name: user.tag,
      iconURL: user.displayAvatarURL(),
    });
    await interaction.editReply({ embeds: [msg] });
  }
}
