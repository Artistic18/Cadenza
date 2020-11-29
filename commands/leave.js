module.exports = {
    name: 'leave',
    description: "Disconnects the bot.",
    execute(message){
        const queue = message.client.queue.get(message.guild.id);
        queue.songs = []
        queue.channel.leave();
        message.channel.send(`**Cadenza** left successfully`).catch(console.error);
        
    }
}