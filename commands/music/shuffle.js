const { play } = require("../../include/play");
module.exports = {
    name: 'shuffle',
    aliases: ["shuff"],
    description: 'Shuffles the queue.',
    execute(message){
        const queue = message.client.queue.get(message.guild.id);
        if(!queue) return message.channel.send("There is no song playing.").catch(console.error);
        queue.playing = true;
        for(let i = queue.songs.length - 1; i > 0; i--){
           const j = Math.floor(Math.random() * i);
           [queue.songs[i], queue.songs[j]] = [queue.songs[j], queue.songs[i]];
        }
        play(queue.songs[0], message);
        //queue.connection.dispatcher.end();
        queue.textChannel.send(`${message.author} 🔀 **Shuffled** the Queue`).catch(console.error);
    }
}