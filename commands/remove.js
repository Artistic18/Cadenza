module.exports = {
    name: 'remove',
    description: 'remove a song from queue',
    execute(message, args){
        const queue = message.client.queue.get(message.guild.id);
        if(!queue) return message.channel.send("There are no songs in queue").catch(console.error);

        if(!args.length) return message.reply("Please provide the index of the song to be removed");
        if(isNaN(args[0])) return message.reply("Please provide the index of the song to be removed");

        const song = queue.songs.splice(args[0] - 1, 1);
        queue.textChannel.send(`Removed **${song[0].title}** from queue.`);
    }
};