const BaseCommand = require('../../utils/structures/BaseCommand');
const mongoose = require('mongoose');
const UD = require('../../database/UserSchema');

module.exports = class WarnCommand extends BaseCommand {
  constructor() {
    super('warn', 'moderation', []);
  }

  run(client, message, args) {
    
  }
}