const {
  MessageEmbed
} = require("discord.js");
const {
  cwd
} = require("process");
const {
  colour,
  image,
  emotes
} = require(`${cwd()}/Structures/data.json`);
const {
  version
} = require(`${cwd()}/package.json`);



module.exports = {
  name: "stop",
  description: "Stop the music player",
  aliases: [
    "disconnect",
    "leave"
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
      queue.stop();
      message.channel.send({
        embeds: [
          new MessageEmbed()
          .setDescription(`${emotes.stop} Stoped the current queue for you.`)
        ]
      });
      
    } catch(error) {
      message.channel.send({
        content: `Error: ${error}`
      })
    };
  }
};