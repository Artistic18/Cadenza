const { MessageEmbed } = require('discord.js');
const { getSong } = require('genius-lyrics-api');
const { genius_lyrics } = require('../../config.json');

module.exports = {
  name: 'lyrics',
  aliases: ['ly'],
  description: 'Generates the lyrics for the given song and send as text',
  async execute(message, args) {
    let options;
    if (args.length == 0) {
      const queue = message.client.queue.get(message.guild.id);
      if (!queue)
        return message.channel
          .send(`\`There is no song playing\``)
          .catch(console.error);
      options = {
        apiKey: process.env.genius,
        title: queue.songs[0].title,
        artist: '',
        optimizeQuery: true,
      };
    } else {
      options = {
        apiKey: process.env.genius,
        title: args.join(' '),
        artist: ' ',
        optimizeQuery: true,
      };
    }
    const wait = await message.channel.send(`\`Searching for lyrics...\``);
    try {
      const song = await getSong(options);
      const embed = new MessageEmbed()
        .setTitle(options.title)
        .setURL(song.url)
        .setDescription(song.lyrics.substring(0, 2048))
        .setColor('#f25900')
        .setTimestamp()
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({
            format: 'png',
            dynamic: true,
            size: 1024,
          })
        );
      return message.channel.send(embed);
    } catch (error) {
      console.error(error);
      return message.reply(`\`No lyrics found\``).catch(console.error);
    }
  },
};
