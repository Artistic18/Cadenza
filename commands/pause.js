module.exports = {
    name: 'pause',
    cooldown: 3,
    description: "Pause the current song.",
    execute(message){
       const queue = message.client.queue.get(message.guild.id);
       if(!queue) return message.reply("There is nothing playing").catch(console.error);
       if(queue.playing){
           queue.playing = false;
           queue.connection.dispatcher.pause(true);
           return queue.textChannel.send(`⏸ Paused.`).catch(console.error);
       }
    }
};