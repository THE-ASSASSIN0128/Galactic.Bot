const {
  MessageEmbed
} = require("discord.js");
const {
  version
} = require(`${process.cwd()}/package.json`);
const {
  colour,
  image,
  url
} = require(`${process.cwd()}/Structures/data.json`);




module.exports = {
  name: "help",
  description: "Send's a Help embed",
  aliases: [
    "hlp",
    "hp",
    "h"
  ],
  run: async(client, message, args) => {

    const Help = new MessageEmbed()
      .setTitle("Welcome to Galactic.Bot")
      .setDescription(`${client.commands.map(cmd => `${cmd.name}`).join(",\n")}`)
      .setColor(colour.bot)
      .setThumbnail(client.user.avatarURL({
        dynamic: true,
        size: 4096
      }))
      .setFooter({
        text: `${client.user.username} | V•${version}`,
        iconURL: `${client.user.avatarURL({
          dynamic: true,
          size: 4096
        })}`
      })
      .setTimestamp()

    message.channel.send({
      embeds: [Help]
    });
  },
};