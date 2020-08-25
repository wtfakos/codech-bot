const BaseCommand = require('../../utils/structures/BaseCommand');

const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');


module.exports = class HuntCommand extends BaseCommand {
  constructor() {
    super('hunt', 'fun', []);
  }

  run(client, message, args) {
    let hunte = new MessageEmbed()
      .setTitle("Hunting..")
      .setImage("https://images.pexels.com/photos/462930/pexels-photo-462930.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")
      .setColor("DARK_GREEN")
      .setDescription('You decided to go hunting. This process takes 1 minutes.')
      .setTimestamp()
      .setURL("https://images.pexels.com/photos/462930/pexels-photo-462930.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")
      .setFooter(message.author.tag, message.author.avatarURL())

    message.channel.send(hunte);
  }
}