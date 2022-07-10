const {
  cwd
} = require("process");
const {
  MessageEmbed
} = require("discord.js");
const {
  colour
} = require(`${cwd()}/Structures/data.json`);



module.exports = {
  name: "avatar",
  category: "Fun",
  cooldown: 5,
  description: "Replies with user Avatar",
  async execute(client, message, args) {

    const info = new MessageEmbed()
      .setDescription("**Avatar. For URL click on the image.**")
      .setColor(colour.bot)
      .setTimestamp()

    const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    
    if (User) {
      info
        .setAuthor({
          name: `${User.user.tag}`,
          iconURL: `${User.user.avatarURL({
            dynamic: true,
            size: 4096
          })}`
        })
        .setImage(`${User.user.avatarURL({
          dynamic: true,
          size: 4096
        })}`)
      
    } else if (!User) {

      const user = message.author;

      info
        .setAuthor({
          name: `${user.tag}`,
          iconURL: `${user.avatarURL({
            dynamic: true,
            size: 4096
          })}`
        })
        .setImage(`${user.avatarURL({
          dynamic: true,
          size: 4096
        })}`)

    };

    message.channel.send({
      embeds: [info]
    });
  },
};