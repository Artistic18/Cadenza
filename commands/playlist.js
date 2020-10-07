const { MessageEmbed } = require("discord.js");
const { play } = require("../include/play");
const { Youtube_API } = require("../config.json");
const YouTubeAPI = require("simple-youtube-api");
const { MAX_PLAYLIST_SIZE } = 10;
const youtube = new YouTubeAPI(Youtube_API);

module.exports = {
    name: 'playlist',
    aliases: ["pl"],
    description: 'Plays a youtube playlist',
    async execute(message, args){
        const { channel } = message.member.voice;
        const queue = message.client.queue.get(message.guild.id);
        if(queue && channel != message.guild.me.voice.channel)
          return message.reply(`You must be in the same channel as ${message.client.user}`).catch(console.error);
        if(!args.length)
          return message.reply("Please enter a valid link").catch(console.error);
        if(!channel)
          return message.channel.reply("You need to be in a voice channel").catch(console.error);
        const permissions = channel.permissionsFor(message.client.user);
        if(!permissions.has("CONNECT"))
          return message.reply("Cannot join this channel");
        if(!permissions.has("SPEKAK"))
          return message.reply("I don't permission to speak on this channel");
        
        const search = args.join(" ");
        const pattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
        const url = args[0];
        const urlValid = pattern.test(args[0]);

        const queueConstruct = {
            textChannel: message.channel,
            channel,
            connection: null,
            songs: [],
            loop: false,
            volume: 100,
            playing: true
        };

        let song = null;
        let playlist = null;
        let videos = [];

        if(urlValid){
            try{
                playlist = await youtube.getPlaylist(url, {part: "snippet"});
                videos = await playlist.getVideos(31 , {part: "snippet"});
            }catch(error){
                console.error(error);
                return message.reply("Invalid Playlist!").catch(console.error);
            }
        }else{
            try{
                const results = await youtube.searchPlaylists(search, 1, {part: "snippet"});
                playlist = result[0];
                videos = await playlist.getVideos(31 , {part: "snippet"});
            }catch(error){
                console.error(error);
                return message.reply("Invalid Playlist!").catch(console.error);
            }
        }

        videos.forEach((video) => {
            song ={
                title: video.title,
                url: video.url,
                duration: video.durationSeconds
            }
            if(queue){
                queue.songs.push(song);
            }else{
                queueConstruct.songs.push(song);
            }

        });
        let playlistEmbed = new MessageEmbed()
          .setTitle(`${playlist.title}`)
          .setURL(playlist.url)
          .setColor("#f58d42")
          .setTimestamp();
        
        playlistEmbed.setDescription(queueConstruct.songs.map((song, index) => `${index+1}. ${song.title}`));
        if(playlistEmbed.description.length >= 2048)
        playlistEmbed.description = playlistEmbed.description.substr(0, 2007) + "\nPlaylist too large.";
     
        message.channel.send(`${message.author} Started Playlist.`, playlistEmbed);
        if(!queue) message.client.queue.set(message.guild.id, queueConstruct);

        if(!queue){
            try{
                queueConstruct.connection = await channel.join();
                await queueConstruct.connection.voice.setSelfDeaf(true);
                play(queueConstruct.songs[0], message);
            }catch(error){
                console.error(error);
                message.client.queue.delete(message.guild.id);
                await channel.leave();
                return message.channel.send(`Could not join channel.`).catch(console.error);
            }
        }
    },

};