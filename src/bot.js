require('dotenv').config();
const mongoose = require('mongoose');
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const client = new Client({
  partials: ['MESSAGE', 'REACTION']
});

mongoose
  .connect(
    "mongodb+srv://EatPieRN:" +
      process.env.DB_PASS +
      "@dcthings.tjq4w.mongodb.net/codechbot?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
.then(console.log("Connected to DB."));

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = process.env.DISCORD_BOT_PREFIX;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();

