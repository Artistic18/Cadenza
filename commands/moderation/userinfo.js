module.exports = {
    name: 'userinfo',
    description: 'Provides information about the user',
    execute(message, args){
        message.channel.send(`Username: ${message.author.username}\nUser ID: ${message.author.id}`);
    },
};