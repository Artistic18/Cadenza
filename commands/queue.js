const { MessageEmbed, splitMessage, escapeMarkdown } = require("discord.js");

module.exports = {
    name: 'queue',
    aliases: ["q"],
    description: 'Show the music queue.',
    execute(message){
        const queue = message.client.queue.get(message.guild.id);
        if(!queue) return message.reply("Queue is empty.").catch(console.error);

        const des = queue.songs.map((song, index) => `${index + 1}. ${escapeMarkdown(song.title)} [${new Date(song.duration * 1000).toISOString().substr(11,8)}]`);
        let Embed = new MessageEmbed()
           .setTitle("Cadenza Music Queue")
           .setDescription(des)
           .setColor("#2af8a6");
        
        const splitdes = splitMessage(des, {
            maxlength: 2048,
            char: "\n",
            prepend: "",
            append: ""
        });

        splitdes.forEach(async (m) => {
            Embed.setDescription(m);
            message.channel.send(Embed);
        });
    }
};