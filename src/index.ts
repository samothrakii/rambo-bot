import { Client, Interaction, Message } from 'discord.js';
import { IntentOptions } from './config/IntentOptions';

import 'dotenv/config';
import { connectDb } from './db/connectDb';
import { validateEnv } from './util/validateEnv';
import { onInteraction } from './event/onInteraction';
import { onReady } from './event/onReady';
import { onMessage } from './event/onMessage';

(async () => {
  if (!validateEnv()) {
    return;
  }

  const bot = new Client({ intents: IntentOptions });

  bot.on('ready', async () => await onReady(bot));
  bot.on(
    'interactionCreate',
    async (interaction: Interaction) => await onInteraction(interaction)
  );
  bot.on('messageCreate', async (ctx: Message) => await onMessage(bot, ctx));

  await connectDb();

  await bot.login(process.env.TOKEN);
})();
