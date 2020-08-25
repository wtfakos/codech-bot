const BaseCommand = require('../../utils/structures/BaseCommand');

const ms = require('ms');
const { MessageEmbed } = require('discord.js');

const { noPerm, unexpError, wrongArgs, userNotFound, uncorrectTime, intLimitReached, userMod, mentionedAuthorSame} = require('../../utils/embeds');

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', []);
  }

  run(client, message, args) {

    /* Embeds */
    const alreadyMutedEmbed = new MessageEmbed()
      .setTitle(`${client.emojis.cache.get('747514666862903317')} Hold up!`)
      .setDescription('This user is already muted!')
      .setColor('RED')
      .setFooter('Codech', message.guild.iconURL())
      .setTimestamp();
    /* Embeds */

    /* Consts */
    const reason = args.slice(2).join();
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const regex = /\d+[smhdwy]/.exec(args[1]);
    /* Consts */
    
    /* Checks */
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return noPerm(message, client);
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return unexpError(message, client);

    if (!mentionedMember) return userNotFound(message, client);

    if (mentionedMember.id === message.author.id) return mentionedAuthorSame(message, client);

    if (mentionedMember.roles.highest.position >= message.member.roles.highest.position) return userMod(message, client);

    if (mentionedMember.roles.cache.has('747516384854147213')) return message.channel.send(alreadyMutedEmbed);

    if (!args[0]) return wrongArgs(message, client, '\`$mute <user> <duration (s, m, h, d, w)> <reason>\`');
    if (!args[1]) return wrongArgs(message, client, '\`$mute <user> <duration (s, m, h, d, w)> <reason>\`');
    // if (!args[2]) return wrongArgs(message, client, '\`$mute <user> <duration (s, m, h, d, w)> <reason>\`');

    if (!regex) return uncorrectTime(message, client);
    if (ms(regex[0]) >= 2147483647) return intLimitReached(message, client);

    /* Checks */

    let end = new Date(Date.now() + ms(args[1]));

    var embed = new MessageEmbed()
      .setTitle(`${client.emojis.cache.get('747513150722801794')} Get shushed!`)
      .setDescription(
        `
        Moderator: **${message.author.tag}** - **${message.author.id}**\n
        Victim: **${mentionedMember.user.tag}** - **${mentionedMember.user.id}**\n
        Duration: ${args[1]}\n
        Reason: **${reason}**
        `
      )
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setThumbnail(mentionedMember.user.displayAvatarURL())
      .setColor("RANDOM")
      .setFooter('Codech', message.guild.iconURL())
      .setTimestamp()

    mentionedMember.roles.add('747516384854147213');

    message.channel.send(embed);

    setTimeout(() => {
      if (mentionedMember.roles.cache.has('747516384854147213')) return mentionedMember.roles.remove('747516384854147213');;
    }, ms(regex[0]))
    return undefined
  }


}