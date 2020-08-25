const BaseEvent = require('../../utils/structures/BaseEvent');

/* Consts */

const { MessageEmbed } = require('discord.js');
const ms = require('ms');

const openTickets = new Map();
const destCh = '747042734434549798';

/* Consts */

/* Emojis */
    let accept = '747471633366778037';
    let reject = '747471633693933688';
/* Emojis */

module.exports = class DirectMessageEvent extends BaseEvent {
  constructor() {
    super('DM');
  }
  
  async run(client, message) {
    if (message.author.bot) return;

    if (!openTickets.has(message.author.id)) {
        message.channel.send('Hi! We have recevied your message. Please wait until one of our staff members replies to you.')
        openTickets.set(message.author.id, message.guild);

        const mmCh = client.channels.cache.get('747042734434549798');
        
        if (mmCh) {
            const files = getAttachmentLinks(message.attachments);
            const embed = new MessageEmbed({
                author: {
                    name: `New message request from: ${message.author.tag}`,
                    icon_url: message.author.avatarURL(),
                },
                description: message.content,
                footer: {
                    text: "This confirmation message becomes invalid in 3 hours."
                },
                timestamp: new Date(),
                color: "RANDOM",
                image: {
                    url: files.toString(),
                },
            });
            const msg = await mmCh.send(embed);
            await msg.react(accept);
            await msg.react(reject);

            try {
                const reactionFilter = (reaction, user) => [accept, reject].includes(reaction.emoji.id) && !user.bot;
                const reactions = await msg.awaitReactions(reactionFilter, { max: 1, time: ms('3 hours'), errors: ['time'] });
                const choice = reactions.get(accept) || reactions.get(reject);

                if (choice.emoji.id === accept) {
                    console.log('crigne');
                    await handleCollectors(mmCh, message);
                    openTickets.delete(message.author.id);
                } else if (choice.emoji.id === reject) {
                    message.author.send('Your message request was rejected. You may try again later.');
                    setTimeout(() => {
                        openTickets.delete(message.author.id);
                    }, ms('20 seconds'));
                };
            } catch (err) {
                message.author.send('No one was able to accept your request. Please try again.');
                openTickets.delete(message.author.id);
            }
        } else {
            message.channel.send('Something went wrong. Please report this issue to a staff member directly.');
            openTickets.delete(message.author.id);
        };
    }
  }
};

function handleCollectors(channel, message) 
{
    
    /* Filters */
        const filter = m => m.author.id === message.author.id;
        const guildCollectorFilter = m => m.channel.id === channel.id && !m.author.bot;
    /* Filters */

    /* Collectors */
        const dmCollector = message.channel.createMessageCollector(filter);
        const guildChannelCollector = channel.createMessageCollector(guildCollectorFilter);
    /* Collectors */

    return new Promise((receive, reject) => {
        dmCollector.on('collect', m => {
            const files = getAttachmentLinks(m.attachments);
            channel.send(`( **${m.author.tag}** ): ${m.content}`, {
                files,
            });
        });
        guildChannelCollector.on('collect', m => {
            if (m.content.toLowerCase() === '--stop') {
                guildChannelCollector.stop();
                dmCollector.stop();
                receive();
            } else {
                const files = getAttachmentLinks(m.attachments);
                message.author.send(`( **${m.author.tag}** ): ${m.content}`, {
                    files,
                });
            }
        })
    });
};

function getAttachmentLinks(attachments)
{
    const valid = /^.*(gif|png|jpg|jpeg)$/g;

    return attachments.array()
        .filter(attachment => valid.test(attachment.url))
        .map(attachment => attachment.url);
}