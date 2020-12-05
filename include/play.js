const ytdlDiscord = require("ytdl-core-discord");
const play = require("../commands/play");
const { MessageEmbed } = require("discord.js");
module.exports = {
    async play(song, message){
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
        let stream = await ytdlDiscord(song.url,{filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1<<25});
        let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";
        queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
        const dispatcher = queue.connection
         .play(stream, {type: streamType})
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
        try {
            let playMsg = await queue.textChannel.send(embed)
        } catch(error){
            console.error(error);
        }
        //queue.textChannel.send(`Started Playing **${song.title}**`);
    }
};