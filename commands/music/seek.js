const { play } = require("../../include/play");
const { seek } = require("../../include/play");
function timeConvert(str){
    const t = str.split(':');
    let s = 0, m = 1;
    while(t.length > 0){
        s += m * parseInt(t.pop(),10);
        m = m * 60;
    }
    return s;
}
module.exports = {
    name: 'seek',
    description: 'Seeks to a certain point in the current track.',
    execute(message,args){
        const queue = message.client.queue.get(message.guild.id);
        if(!queue) return message.channel.send("There is no song playing.").catch(console.error);
        queue.playing = true;
        let time = timeConvert(args[0]);
        if( time > queue.songs[0].duration)
          return message.channel.send(`**Input a valid time**`);
        else{
            let time = timeConvert(args[0]);
            play(queue.songs[0],message,time.toString());
            return message.channel.send(`Seeked to - **${args}**`);
        }
    }
}