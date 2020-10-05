module.exports = {
    name: 'resume',
    description: 'resume playing a song.',
    execute(message){
        const queue = message.client.queue.get(message.guild.id);
        if(!queue) return message.reply("There is nothing playing.").catch(console.error);
        if(!queue.playing){
            queue.playing = true;
            queue.connection.dispatcher.resume();
            return queue.textChannel.send(`▶ Resume.`);
        }
        return message.reply("The song is not paused.").catch(console.error);
    }
}