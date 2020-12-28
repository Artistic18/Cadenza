const { MessageFlags } = require("discord.js");
const { execute } = require("./resume");

module.exports = {
    name: 'stop',
    description: 'Stops the music.',
    execute(message){
        const queue = message.client.queue.get(message.guild.id);
        if(!queue) return message.reply("There is nothing playing.").catch(console.error);

        queue.songs = [];
        queue.connection.dispatcher.end();
        queue.textChannel.send(`⏹ Stopped.`).catch(console.error);

    }
};