const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'resume',
  aliases: ['r'],
  description: 'Resume playing a song.',
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    const embed = new MessageEmbed()
      .setColor('#ff0000')
      .setDescription('▶ Resume');
    console.log(queue);
    if (!queue)
      return message.reply(`\`There is nothing playing\``).catch(console.error);
    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(embed).catch(console.error);
    }
    return message.reply(`\`The song is not paused\``).catch(console.error);
  },
};
