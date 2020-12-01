const { MessageEmbed } = require("discord.js");
const Bar = require("string-progressbar");
module.exports = {
    name: 'nowplaying',
    aliases: ["np"],
    description: 'returns the song currently being played',
    execute(message){
        const queue = message.client.queue.get(message.guild.id);
        if(!queue) return message.reply("There is nothing playing.").catch(console.error);
        const song = queue.songs[0];
        const curr = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
        const left = song.duration - curr;

        let nowplaying = new MessageEmbed()
          .setTitle("Now Playing")
          .setDescription(`**${song.title}**\n${song.url}`)
          .setColor("#f54298")
          .setAuthor("Cadenza")
        if(song.duration > 0)
         nowplaying.setFooter("Time Remaining: " + new Date(left * 1000).toISOString().substr(11,8));
         return message.channel.send(nowplaying);

    }
};