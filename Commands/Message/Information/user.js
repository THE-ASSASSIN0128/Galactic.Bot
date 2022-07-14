const {
  cwd
} = require("process");
const {
  MessageEmbed
} = require("discord.js");
const {
  colour
} = require(`${cwd()}/Structures/data.json`);
const moment = require("moment");
const axios = require("axios");


module.exports = {
  name: "user-info",
  description: "Replies with user",
  aliases: [
    "whois",
    "user"
  ],
  run: async(client, message, args) => {
    try {
    const user =  message.mentions.members.first() || message.guild.members.fetch(args[0]) || message.author;
    const User = message.guild.members.cache.get(user.id);
    
    let Roles = User.roles.cache
    
    let info1 = new MessageEmbed()
      .setTitle("General Information")
      .setThumbnail(`${user.avatarURL({
        dynamic: true,
        size: 4096
      })}`)
      .setDescription(`**🪧 Name : ${User.displayName} | ${user}\n🏷️ Tag : __${user.tag}__\n🆔 ID : __${user.id}__**`)
      .addField("Joined Server", `${moment(User.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\n** - ${moment(User.joinedAt, "YYYYMMDD").fromNow()}**`)
      .addField("Joined Discord", `${moment(user.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\n** - ${moment(user.createdAt, "YYYYMMDD").fromNow()}**`)

    
    let info2 = new MessageEmbed()
      .setTitle(`Roles [${Roles.size - 1}]`)
      .setDescription(`**${User.roles.cache.map( r => r).join("\n").replace("@everyone", " ")}**`)
      .setTimestamp()
      .setFooter({
        text : `Requested by ${message.author}`,
        iconURL : `${message.author.avatarURL({
          dynamic : true,
          size : 4096
        })}`
      })


    axios.get(`https://discord.com/api/users/${user.id}`, {
      headers:{
        Authorization: `Bot ${client.token}`,
      },
    }).then((res) => {
      const { id,
             discriminator,
             avatar,
             banner,
             accent_color,
             username,
             banner_color 
            } = res.data;

      if(banner) {
        const extension = banner.startsWith("a_") ? ".gif" : ".png";
        const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}`;
        
        info1.setColor(User.displayHexColor)
          .setImage(url)
        info2.setColor(User.displayHexColor)
        
      } else if (banner_color) {
        info1.setColor(banner_color)
        info2.setColor(banner_color)
        
      } else {
        info1.setColor(User.displayHexColor)
        info2.setColor(User.displayHexColor)
        
      };
    });

    
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