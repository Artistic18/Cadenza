const { play } = require("../../include/play");
module.exports = {
    name: 'replay',
    aliases: ["re"],
    description: 'Plays the current song from beginning',
    execute(message){
        const queue = message.client.queue.get(message.guild.id);
        if(!queue) return message.channel.send("There is no song playing.").catch(console.error);
        queue.playing = true;
        play(queue.songs[0],message);
    }
}