const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'pause',
  cooldown: 3,
  aliases: ['pa'],
  description: 'Pause the current song.',
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    const embed = new MessageEmbed()
      .setColor('#ff0000')
      .setDescription('⏸ Paused');
    if (!queue)
      return message.reply(`\`There is nothing playing\``).catch(console.error);
    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel.send(embed).catch(console.error);
    }
  },
};
