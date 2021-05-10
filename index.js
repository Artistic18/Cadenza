const Discord = require('discord.js');
require('dotenv').config();
const{
    prefix,
    token,
} = require('./config.json');

const fs = require('fs');
const client = new Discord.Client();
client.options.http.api = "https://discord.com/api"


client.queue = new Map();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandDirs = fs.readdirSync('./commands')
for(let dir of commandDirs){
    let commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));
    for(let file of commandFiles){
        const command = require(`./commands/${dir}/${file}`);
        client.commands.set(command.name, command);
    }
}


client.once('ready', async() => {
    const servers = await client.guilds.cache.size;
    console.log(`The bot is currently in ${servers} servers.`);
    console.log('Cadenza is Online');
});
client.once('disconect', () => {
    console.log('Disconnect!');
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === "general");
    if(!channel) return;
    channel.send(`Welcome ${member} to the server.`);
})

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

client.login(process.env.token);

