const Discord = require('discord.js');
require('dotenv').config();

const { prefix } = require('./config.json'); // prefix is /

const fs = require('fs');
const client = new Discord.Client(); // creating a new discord client object
//client.options.http.api = "https://discord.com/api"

client.queue = new Map();
client.commands = new Discord.Collection();
//const cooldowns = new Discord.Collection();

// Iterate through all the commands
// Create the command list
const commandDirs = fs.readdirSync('./commands');

for (let dir of commandDirs) {
  let commandFiles = fs
    .readdirSync(`./commands/${dir}`)
    .filter((file) => file.endsWith('.js'));
  for (let file of commandFiles) {
    const command = require(`./commands/${dir}/${file}`);
    client.commands.set(command.name, command);
  }
}

//const commandFiles = fs
client.once('ready', async () => {
  // Fire on bot ready.
  const servers = await client.guilds.cache.size;
  console.log(`The bot is currently in ${servers} servers.`);
  console.log('Cadenza is Online');
});
client.once('disconect', () => {
  console.log('Disconnect!');
});

client.on('guildMemberAdd', (member) => {
  // Check if a user has joined the server
  const channel = member.guild.channels.cache.find(
    (channel) => channel.name === 'general'
  );
  if (!channel) return;
  channel.send(`Welcome ${member} to the server.`);
});

//listen for message
client.on('message', async (msg) => {
  // Check if a user has entered any message and parse it.
  if (!msg.content.startsWith(prefix) || msg.author.bot) {
    return;
  }
  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command) return;

  try {
    command.execute(msg, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error.').catch(console.error);
  }
});

// connect to client
client.login(process.env.token);
