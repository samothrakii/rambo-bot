import { Client, Message, MessageEmbed } from 'discord.js';
import { getQuotesByAlias } from '../module/getQuotesData';
import { DOTA_GO, PARODY_SUFFIX } from '../util/constant';

export const onMessage = async (bot: Client, ctx: Message) => {
  if (ctx.author.bot) {
    return;
  }

  const msg = ctx.content.toLowerCase();

  const word = msg.match(`\\b\\w+(?=${PARODY_SUFFIX}\\b)`);
  if (word) {
    const quotes = await getQuotesByAlias(word[0]);

    if (!quotes || quotes.length === 0) {
      ctx.reply('Either member does not exist or they do not have any quotes yet');;
    } else {
      const res = quotes[Math.floor(Math.random() * quotes.length)];
      ctx.reply(res);;
    }
  }

  switch (msg) {
    case 'zed':
      ctx.channel.send('Óc zed 🐶');
      break;
    case 'end':
      ctx.channel.send('end luôn end luôn');
      break;
    case 'cut':
      ctx.channel.send('Cúc cúc cúc 🐧');
      break;
    case 'len':
      ctx.channel.send('Lên nè lên nè 🤟');
      break;
    case 'oc':
      ctx.channel.send('Óc chót');
      break;
    case 'go?':
      const res = DOTA_GO[Math.floor(Math.random() * DOTA_GO.length)];
      const msg = new MessageEmbed();
      msg.setTitle('TURN DOWN FOR WHAT?');
      msg.setDescription(res);
      msg.setAuthor({
        name: ctx.author.tag,
        iconURL: ctx.author.displayAvatarURL(),
      });
      ctx.reply({ embeds: [msg] });
      break;
  }
};
