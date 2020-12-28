module.exports = {
    name: 'botping',
    aliases: ["bp"],
    description: "Shows the bot's average ping",
    execute(message){
        message.reply(`Average Ping is ${Math.round(message.client.ws.ping)} ms`).catch(console.error);
    }
}