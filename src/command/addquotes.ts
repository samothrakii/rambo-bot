import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interface/Command";
import { addMemberQuotesRecord } from "../module/memberCrud";

export const addquotes: Command = {
  data: new SlashCommandBuilder()
    .setName('addquotes')
    .setDescription('Add new quotes for specific member')
    .addStringOption((option) =>
      option.setName('alias')
        .setDescription('Alias of member in this channel')
        .setRequired(true))
    .addStringOption((option) =>
      option.setName('quotes')
        .setDescription('Quotes list, you can separate by |')
        .setRequired(true)),
  run: async (interaction) => {
    await interaction.deferReply();

    const alias = interaction.options.getString('alias', true);
    const quotes = interaction.options.getString('quotes', true)
      .split('|').map(s => s.trim());

    const msg = await addMemberQuotesRecord(alias, quotes)
      ? 'Done' : 'Could not save quotes, please try again later!';

    await interaction.editReply(msg);
  }
}
