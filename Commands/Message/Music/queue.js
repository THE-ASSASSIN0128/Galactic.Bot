const {
  emotes
} = require(`${process.cwd()}/Structures/data.json`);


module.exports = {
  name: 'queue',
  description: "Get info about the current queue",
  aliases: ['q'],
  run: async(client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send({
        content: `${client.emotes.error} | There is nothing playing!`
      });
    const q = queue.songs.map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join('\n');
     
    message.channel.send({
      content: `**Server Queue**\n${q}`
    });
  },
};