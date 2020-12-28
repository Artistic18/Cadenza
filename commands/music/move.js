require('array.prototype.move');
module.exports = {
    name : 'move',
    aliases: ["m"],
    description: 'Moves a song to the beginning or to a selected position in the queue.',
    execute(message,args){
        let top = 1;
        let pos = 0;
        let target = args[0] - 1;
        let destination = args[1] - 1;
        const queue = message.client.queue.get(message.guild.id);
        if(!queue) return message.channel.send("There is no song playing.").catch(console.error);
        if(args[0]>queue.songs.length)
          return message.reply("Please enter a valid number which is less than queue size.");
        let moved = queue.songs[target];
        queue.songs.move(target, destination || top);
        if(!destination)
          pos = top + 1;
        else 
          pos = destination + 1;
        queue.textChannel.send(`Moved **${moved.title}** to Position **${pos}**`).catch(console.error);  
    },
};