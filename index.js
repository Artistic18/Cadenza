const Discord = require('discord.js');
const{
    prefix,
    token,
} = require('./config.json');

const fs = require('fs');

const client = new Discord.Client();

client.queue = new Map();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const commandFIles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFIles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Cadenza is Online');
});
client.once('disconect', () => {
    console.log('Disconnect!');
});

client.on('message', async (msg) => {
    if(!msg.content.startsWith(prefix) || msg.author.bot){
        return;
    }
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
    if(!command) return;

    try{
        command.execute(msg, args);
    }catch(error){
        console.error(error);
        message.reply("There was an error.").catch(console.error);
    }
});

client.login(token);

