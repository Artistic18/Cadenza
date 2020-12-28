require('events').EventEmitter.prototype._maxListeners = 20;
require('events').defaultMaxListeners = 20;
const ytdl = require("ytdl-core");
const play = require("../commands/music/play");
const { MessageEmbed, StreamDispatcher } = require("discord.js");
let time = 0;
module.exports = {
    async play(song, message, args=0){
        const queue = message.client.queue.get(message.guild.id);

        if(!song){
            setTimeout(function(){
                if(!queue.connection.dispatcher && message.guild.me.voice.channel){
                    queue.channel.leave();
                    queue.textChannel.send(`**Cadenza** left successfully`).catch(console.error);
                }
                else return;
            },120000);
            
            message.client.queue.delete(message.guild.id);
            return queue.textChannel.send(`**Music Queue Ended**`);
        }
        let time1 = args.toString();
        const streamOptions = {
            seek: parseInt(time1),
            highWaterMark: 1
        };
        let stream = await ytdl(song.url,{filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25});
        let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";
        queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
        const dispatcher = queue.connection
         .play(stream, streamOptions, { type: 'opus'})
         .on("finish", () => {
             if(queue.loop){
                 let last = queue.songs.shift();
                 queue.songs.push(last);
                 module.exports.play(queue.songs[0], message);
             }else{
             queue.songs.shift();
             module.exports.play(queue.songs[0], message);
             }

         })
         .on("error", (err) => {
             console.error(err);
             queue.songs.shift();
             module.exports.play(queue.songs[0], message);
         });
        dispatcher.setVolumeLogarithmic(queue.volume / 100);
        let embed = new MessageEmbed()
          .setTitle(`${song.title}`)
          .setURL(`${song.url}`)
          .setThumbnail(song.thumbnail || "https://cdn.iconscout.com/icon/free/png-256/youtube-85-226402.png")
          .setColor("#f54298")
          .addField(`Song Duration`, `\`${new Date(song.duration * 1000).toISOString().substr(11,8)}\``)
          .setAuthor(`Started Playing`)
          .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({format: 'png', dynamic: true, size: 1024}))
        try {
            if(time1 == 0)
              await queue.textChannel.send(embed)
        } catch(error){
            console.error(error);
        }

    }
};