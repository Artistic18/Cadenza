module.exports = {
    name: 'playfrom',
    aliases: ["pf"],
    description: "Plays a song from the given number in the queue",
    execute(message,args){
        if(!args.length)
          return message.reply("You need to provide the song number. ");
        if(isNaN(args[0]))
          return message.reply("You need to provide the song number.");
        const queue = message.client.queue.get(message.guild.id);
        if(!queue) return message.channel.send("There is no song playing.").catch(console.error);
        if(args[0]>queue.songs.length)
          return message.reply("Please enter a valid number which is less than queue size.");
        queue.playing = true;
        if(queue.loop){
            for(let i=0;i<args[0]-1;i++){
                queue.songs.push(queue.songs.shift());
            }
        }else{
            for(i=0; i<args[0]-1; i++){
            queue.songs.push(queue.songs[i]);
            }
            queue.songs = queue.songs.slice(args[0]-2);
        }
        queue.connection.dispatcher.end();
        queue.textChannel.send(`**Playing from** ${args[0]}`).catch(console.error);
    },
};