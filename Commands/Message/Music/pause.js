const {
  MessageEmbed
} = require("discord.js");
const {
  cwd
} = require("process");
const {
  image,
  colour,
  emotes
} = require(`${cwd()}/Structures/data.json`);
const {
  version
} = require(`${cwd()}/package.json`);




module.exports = {
  name: "pause",
  description: "Pause the music player.",
  aliases: [
    "pus",
    "hold"
  ],
  run: async(client, message) => {

    const queue = client.distube.getQueue(message);

    if (!queue)
      return message.channel.send({
        embeds: [
          new MessageEmbed()
          .setAuthor({
            name: "ERROR",
            iconURL: `${image.error}`
          })
          .setDescription(`There is nothing in the queue right now.`)
          .setColor(colour.error)
          .setFooter({
            text: `${client.user.username} | V•${version}`,
            iconURL: `${client.user.avatarURL({
              dynamic: true,
              size: 4096
            })}`
          })
        ]
      });

    try {
      queue.pause();
      message.channel.send({
        embeds: [
          new MessageEmbed()
          .setDescription(`${emotes.pause} Paused the current queue for you.`)
        ]
      });
      
    } catch (error) {
      message.channel.send({
        embeds: [
          new MessageEmbed()
          .setDescription(`${emotes.pause} The queue is already paused.`)
        ]
      })
    };
  },
};



/*module.exports = { 
  name: 'pause',
  description: "Pause the music player.",
  aliases: ['pause', 'hold'], 
  inVoiceChannel: true, 
  run: async (client, message) => {  
    const queue = client.distube.getQueue(message)  
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`) 
    if (queue.pause) {
      queue.resume()
        return message.channel.send('Resumed the song for you :)') 
     
    }
    queue.pause() 
    message.channel.send('Paused the song for you :)') 
   } 
}*/