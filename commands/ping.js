module.exports = {
    name: 'ping',
    description: "This is a ping command",
    execute(message, args){
        const user = message.author;
        message.channel.send(`Hello ${user}`);
    },
};