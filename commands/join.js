const { Constants } = require("discord.js");

module.exports = {
    name: 'join',
    description: 'Joins the channel as user!',
    async execute(message){
        const {channel} = message.member.voice;
        if(!channel){
            return message.reply("You need to join a voice channel first!");
        }
        
        const permissions = channel.permissionsFor(message.client.user);
        if(!permissions.has("CONNECT"))
          return message.reply("Cannot connect to voice, missing permissons");
        if(!permissions.has("SPEAK"))
          return message.reply("Cannot speak in this voice channel, make sure permissions are correct");
        
        channel.join();
        
    }
}