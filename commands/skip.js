module.exports = {
    name: 'skip',
    description: 'Skips the current song',
    execute(message){
        const queue = message.client.queue.get(message.guild.id);
        if(!queue) return message.reply("There is nothing playing").catch(console.error);

        queue.playing = true;
        queue.connection.dispatcher.end();
        queue.textChannel.send(`⏭ Skipped.`).catch(console.error);
      
    }
};