const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SrcCommand extends BaseCommand {
  constructor() {
    super('src', 'useful', []);
  }

  run(client, message, args) {
    message.channel.send('https://sourceb.in/');
  }
}