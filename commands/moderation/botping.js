const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'botping',
  aliases: ['bp'],
  description: "Shows the Bot's Ping",
  execute(message) {
    let embed = new MessageEmbed()
      .addField('Ping', `${Math.round(message.client.ws.ping)}ms`, true)
      .setColor('#f54298');
    message.reply(embed).catch(console.error);
  },
};
