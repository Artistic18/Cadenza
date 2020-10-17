module.exports = {
    name: 'leave',
    description: "Disconnects the bot.",
    execute(message){
        const queue = message.client.queue.get(message.guild.id);
        if(!queue)
          return message.reply("Bot is not in a voice channel!");
        queue.songs = []
        queue.channel.leave();
        message.channel.send(`**Cadenza** left successfully`).catch(console.error);
        
    }
}