module.exports = {
  name: 'loop',
  aliases: ['lq'],
  description: 'Toogle looping',
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.reply('There is no song playing').catch(console.error);

    queue.loop = !queue.loop;
    return queue.textChannel
      .send(`Loop is ${queue.loop ? '**ON**' : '**OFF**'}`)
      .catch(console.error);
  },
};
