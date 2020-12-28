module.exports = {
    name: 'delete',
    description: 'Delete messages in bulk',
    async execute(message, args){
        const amount = parseInt(args[0]) +1 ;
        if(isNaN(amount)){
            return message.reply('Enter a valid number.');
        }
        else if(amount < 1 || amount > 100){
            return message.reply('Enter a number between 1 and 99.');
        }

        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('There was an error trying to delete messages');
        });
        message.channel.send(`Deleted ${amount-1} messages.`);
    },
};