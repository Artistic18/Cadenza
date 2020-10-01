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
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
       client.commands.get('ping').execute(msg, args);
    }
});

client.login(token);

