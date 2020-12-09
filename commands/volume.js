module.exports = {
    name: 'volume',
    aliases: ["v"],
    description: 'Change the volume of bot',
    execute(message,args){
        const queue = message.client.queue.get(message.guild.id);
        if(!queue) return message.channel.send("There is no song playing.").catch(console.error);
        if(!args[0]) return message.reply(`The current volume is: **${queue.volume}%**`).catch(console.error);
        if(isNaN(args[0])) return message.reply(`Please enter a valid volume.`).catch(console.error);
        if (Number(args[0]) > 100 || Number(args[0]) <= 0)
           return message.reply(`Please enter a number between 0 - 100.`).catch(console.error);
        
        queue.volume = args[0];
        queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

        return queue.textChannel.send(`Volume set to: **${args[0]}%**`).catch(console.error);
    
    }
};