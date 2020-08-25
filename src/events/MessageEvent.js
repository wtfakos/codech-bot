// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message
const BaseEvent = require('../utils/structures/BaseEvent');
const mongoose = require('mongoose');
const UD = require('../database/UserSchema');
const { MessageEmbed } = require('discord.js');

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.channel.type == "dm") return;
    if (message.author.bot) return;

    const { guild, member } = message;

    addXP(guild.id, member.id, Math.floor(Math.random() * 27) , message);
  }

};

const getNeededXP = level => level * level * 100;

const addXP = async (guildId, userId, xpToAdd, message) => {
  const result = await UD.findOneAndUpdate(
    {
      guildId,
      userId,
    },
    {
      guildId,
      userId,
      $inc: {
        xp: xpToAdd,
      },
    }, {
      upsert: true,
      new: true,
    }
  );

  let { xp, level } = result;
  const needed = getNeededXP(level);

  if (xp >= needed) {
    ++level
    xp -= needed

    message.reply(`level ${level}`)

    await UD.updateOne({
      guildId,
      userId,
    }, {
      level,
      xp,
    })
  }
}