const {
  cwd
} = require("process");
const {
  MessageEmbed
} = require("discord.js");
const {
  version
} = require(`${cwd()}/package.json`);
const {
  colour
} = require(`${cwd()}/Structures/data.json`);
const moment = require("moment");




module.exports = {
  name: "user",
  description: "Replies with user",
  aliases: [
    "whois",
    "user-info"
  ],
  run: async(client, message, args) => {
    try {
    
      const user = message.mentions.members.first() || message.author;
      const User = message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(user.id);
      if (!User && !args[0]) 
        return message.channel.send({
          content: `Please mention the user or provide a valid user id.`
        });
      
      let Roles = User.roles.cache
    
      let info1 = new MessageEmbed()
        .setTitle("General Information")
        .setThumbnail(`${User.user.avatarURL({
          dynamic: true,
          size: 4096
        })}`)
        .setDescription(`**🪧 Name : ${User.displayName} | ${User}\n🏷️ Tag : __${User.user.tag}__\n🆔 ID : __${User.user.id}__**`)
        .setColor(colour.bot)
        .addField("Joined Server", `${moment(User.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\n** - ${moment(User.joinedAt, "YYYYMMDD").fromNow()}**`)
        .addField("Joined Discord", `${moment(user.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\n** - ${moment(user.createdAt, "YYYYMMDD").fromNow()}**`)

      let info2 = new MessageEmbed()
        .setTitle(`Roles [${Roles.size - 1}]`)
        .setDescription(`**${User.roles.cache.map( r => r).join("\n").replace("@everyone", " ")}**`)
        .setColor(colour.bot)
        .setTimestamp()
        .setFooter({
          text : `${client.user.username} | V•${version}`,
          iconURL : `${client.user.avatarURL({
            dynamic : true,
            size : 4096
          })}`
        })
    
      message.channel.send({
        embeds: [info1, info2]
      });
    } catch (error) {
      message.channel.send({
        content: `**ERROR**:\n${error}`
      })
    }
  },
};