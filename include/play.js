const { Collector } = require("discord.js");
const ytdlDiscord = require("ytdl-core");
const play = require("../commands/play");
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
        queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
        const dispatcher = queue.connection
         .play(ytdlDiscord(song.url))
         .on("finish", () => {
             queue.songs.shift();
             module.exports.play(queue.songs[0], message);

         })
         .on("error", (err) => {
             console.error(err);
             queue.songs.shift();
             module.exports.play(queue.songs[0], message);
         });
         dispatcher.setVolumeLogarithmic(queue.volume / 100);
        queue.textChannel.send(`Started Playing **${song.title}**`);
    }
};
