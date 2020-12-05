const { MessageEmbed, splitMessage, escapeMarkdown } = require("discord.js");
module.exports = {
    name: 'queue',
    aliases: ["q"],
    description: 'Show the music queue.',
    async execute(message,args){
        const queue = message.client.queue.get(message.guild.id);
        if(!queue) return message.reply("Queue is empty.").catch(console.error);
        let curr = 0;
        if(args[0] != isNaN  && args[0] > 0)
           curr = args[0] - 1;
        const embeds = Page(message,queue.songs);
        const queueEmbed = await message.channel.send(embeds[curr]);
        message.channel.send(`\`Current Page: ${curr + 1}/${embeds.length}\``);
    
    }
};

    function Page(message,queue,start=0){
            let embeds = [];
            let size = 20;
            for(let i=start; i< queue.length; i+=20){
                const current = queue.slice(i,size);
                let j = i;
                size += 20;
                const info = current.map((track) => `${++j} - [${track.title}](${track.url})`).join("\n");
                const splitdes = splitMessage(info, {
                    maxlength: 2048,
                    char: "\n",
                    prepend: "",
                    append: ""
                });
                
                const embed = new MessageEmbed()
                   .setTitle(`**Cadenza Music Queue**`)
                   .setColor("#7a45de")
                   .setDescription(`**Current Song - [${queue[0].title}](${queue[0].url})**\n\n${info}`)
                   .setTimestamp()
                splitdes.forEach(async (m) => {
                    embed.setDescription(m);
                    embeds.push(embed)
                })
                
        }
        return embeds;
}