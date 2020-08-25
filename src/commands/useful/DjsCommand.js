const BaseCommand = require('../../utils/structures/BaseCommand');
const request = require('request-promise')

module.exports = class DjsCommand extends BaseCommand {
  constructor() {
    super('djs', 'useful', []);
  }

  async run(client, message, args) {
    let queryString = args[0]
    
    let docs = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${queryString}`
    let response = await request(docs)
    var jsonembed = JSON.parse(response)

    message.channel.send({embed: jsonembed})
  }
}