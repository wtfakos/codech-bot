const { MessageEmbed } = require("discord.js");

module.exports = {
  noPerm: function (message, client) {
    const noPermEmbed = new MessageEmbed()
      .setTitle(`${client.emojis.cache.get("747471633693933688")} Access denied!`)
      .setDescription("You don\'t have permission to use this command.")
      .setColor("RED")
      .setFooter("Codech", message.guild.iconURL())
      .setTimestamp()

    message.channel.send(noPermEmbed);
  },
  unexpError: function (message, client) {
    const unexpErrorEmbed = new MessageEmbed()
      .setTitle(`${client.emojis.cache.get('747493563461533726')} Uh oh!`)
      .setDescription('An unexpected error has shown up! Please contact one of our staff members!')
      .setColor("RED")
      .setFooter('Codech', message.guild.iconURL())
      .setTimestamp()
    
    message.channel.send(unexpErrorEmbed);
  },
  wrongArgs: function (message, client, syntax) {
    const wrongArgsEmbed = new MessageEmbed()
      .setTitle(`${client.emojis.cache.get("747471633693933688")} Missing arguments!`)
      .setDescription(`One or more argument(s) is/are missing! Correct usage: ${syntax}`)
      .setColor("RED")
      .setFooter("Codech", message.guild.iconURL())
      .setTimestamp()

    message.channel.send(wrongArgsEmbed);
  },
  userNotFound: function (message, client) {
    const userNotFoundEmbed = new MessageEmbed()
      .setTitle(`${client.emojis.cache.get("747471633693933688")} I missed something?`)
      .setDescription("I cannot find the specified user. Please double check everything.")
      .setColor("RED")
      .setFooter("Codech", message.guild.iconURL())
      .setTimestamp()

    message.channel.send(userNotFoundEmbed);
  },
  uncorrectTime: function (message, client) {
    const uncorrectTimeEmbed = new MessageEmbed()
      .setTitle(`${client.emojis.cache.get("747471633693933688")} Invalid amount of time!`)
      .setDescription('The amount of time you specified is invalid. Correct usage: e.g. \`1s, 1m, 1h, 1d, 1w, 1y\`')
      .setColor("RED")
      .setFooter("Codech", message.guild.iconURL())
      .setTimestamp()

    message.channel.send(uncorrectTimeEmbed);
  },
  intLimitReached: function (message, client) {
    const intLimitReachedEmbed = new MessageEmbed()
      .setTitle(`${client.emojis.cache.get('747493563461533726')} Uh oh!`)
      .setDescription('You passed the int32 limit! Make sure that your number is less than 2,147,483,647')
      .setColor("RED")
      .setFooter('Codech', message.guild.iconURL())
      .setTimestamp()

    message.channel.send(intLimitReachedEmbed);
  },
  userMod: function (message, client) {
    const userModEmbed = new MessageEmbed()
      .setTitle(`${client.emojis.cache.get("747471633693933688")} Calm down!`)
      .setDescription('Dont be angry! You can\'t moderate your superior!')
      .setColor("RED")
      .setFooter('Codech', message.guild.iconURL())
      .setTimestamp()

    message.channel.send(userModEmbed);
  },
  mentionedAuthorSame: function (message, client) {
    const mentionedAuthorSameEmbed = new MessageEmbed()
      .setTitle(`${client.emojis.cache.get('747471633693933688')} No sad vibes!`)
      .setDescription(`You can't moderate yourself! Don't be sad buddy!`)
      .setColor("RED")
      .setFooter('Codech', message.guild.iconURL())
      .setTimestamp()

    message.channel.send(mentionedAuthorSameEmbed);
  }
}; 
