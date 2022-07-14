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
  name: "resume",
  description: "Resume the queue.",
  aliases: [
    "rs",
    "res",
    "rm",
    "r"
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
      queue.resume();
      message.channel.send({
        embeds: [
          new MessageEmbed()
          .setDescription(`${emotes.resume} Resumed the current queue for you.`)
        ]
      });
      
    } catch (error) {
      message.channel.send({
        embeds: [
          new MessageEmbed()
          .setDescription(`${emotes.resume} The queue is already playing.`)
        ]
      })
    };
  }
};