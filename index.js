const Discord = require('discord.js');
const{
    prefix,
    token,
} = require('./config.json');

const fs = require('fs');

const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFIles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFIles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Cadenza is Online');
});

client.on('message', msg=> {
    if(!msg.content.startsWith(prefix) || msg.author.bot){
        return;
    }
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
       client.commands.get('ping').execute(msg, args);
    }
    else if(command === 'userinfo'){
        client.commands.get('userinfo').execute(msg,args);
    }
    else if(command === 'delete'){
        const amount = parseInt(args[0]) +1 ;
        if(isNaN(amount)){
            return msg.reply('Enter a valid number.');
        }
        else if(amount <= 1 || amount > 100){
            return msg.reply('Enter a number between 1 and 99.');
        }
        else{
        msg.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            msg.channel.send('There was an error trying to delete messages');
        });
        msg.channel.send(`Deleted ${args} messages.`);
        }
    }
});

client.login(token);

