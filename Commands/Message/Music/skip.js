const {
  MessageEmbed
} = require("discord.js");
const {
  cwd
} = require("process");
const{
  colour,
  image,
  emotes
} = require(`${cwd()}/Structures/data.json`);



module.exports = {
  name: "skip",
  description: "skip the current playing song in the queue",
  aliases: [
    "sk",
    "s"
  ],
  inVoiceChannel: true,
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
      
      const song = await queue.skip();
      message.channel.send({
        embeds: [
          new MessageEmbed()
          .setDescription(`${emotes.next} Skipped! the current song.\n\nNow Playing: ${song.name}`)
        ]
      });
      
    } catch(error) {
      message.channel.send({
        content: `Error: ${error}`
      })
    };
  }
};