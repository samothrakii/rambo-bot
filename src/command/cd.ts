import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { Command } from "../interface/Command";

export const cd: Command = {
  data: new SlashCommandBuilder()
    .setName('cd')
    .setDescription('Counting down')
    .addIntegerOption((option) =>
      option.setName('duration')
        .setDescription('The countdown duration')
        .setRequired(true))
    .addIntegerOption((option) =>
      option.setName('time_unit')
        .setDescription('The time unit')
        .setRequired(true)
        .addChoices(
          { name: 'Seconds', value: 1 },
          { name: 'Minutes', value: 60 },
          { name: 'Hours', value: 3600 },
        )),
  run: async (interaction) => {
    const { user } = interaction;

    const dur = interaction.options.getInteger('duration', true);
    const unit = interaction.options.getInteger('time_unit', true);

    let unitStr = `... sorry i don't know`;
    switch (unit) {
      case 1:
        unitStr = 'seconds';
        break;
      case 60:
        unitStr = 'minutes';
        break;
      case 3600:
        unitStr = 'hours';
        break;
    }

    const msg = new MessageEmbed();
    msg.setTitle('Hurry up');
    msg.setDescription(`You have ${dur} ${unitStr}`);
    msg.setAuthor({
      name: user.tag,
      iconURL: user.displayAvatarURL(),
    });
    interaction.reply({ embeds: [msg] });

    let duration = dur * unit;
    const interval = setInterval(async () => {
      duration--;
      if (duration === 0) {
        clearInterval(interval);
        interaction.channel?.send(`Time's up @everyone`);
      }
    }, 1000);
  }
}
