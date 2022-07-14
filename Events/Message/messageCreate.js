const {
  cwd
} = require("process");
const {
  MessageEmbed
} = require("discord.js");
const {
  image,
  colour,
  bot
} = require(`${cwd()}/Structures/data.json`);
const {
  version
} = require(`${cwd()}/package.json`);



module.exports = {
  name: "messageCreate",
  execute: async (message, client) => {

    const mPrefix = new RegExp(`<@!?${client.user.id}>( |)$`);

    if (message.content.match(mPrefix)) {
      return message.channel.send({
        embeds: [
          new MessageEmbed()
          .setTitle("Welcome to the Galaxy")
          .setDescription(`My prefix is **${bot.prefix}**\n\nFor more info/commands use **G!help**.\n\nYou can also use **/help** as a slash command.`)
          .setThumbnail(`${client.user.avatarURL({
            dynamic: true,
            size: 4096
          })}`)
          .setColor(colour.bot)
          .setFooter({
            text: `${client.user.username} | V•${version}`,
            iconURL: `${client.user.avatarURL({
              dynamic: true,
              size: 4096
            })}`
          })
          .setTimestamp()
        ]
      });
    };
    
    if (message.author.bot) return;
    if (!message.guild) return;
    const prefix = bot.prefix;

    if (!message.content.startsWith(prefix)) return;

    const args = message
      .content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);

    const cmd = args
      .shift()
      .toLowerCase();

    if (cmd.length === 0) return;
      
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

    if (!command) 
      return message.channel.send({
        embeds: [
          new MessageEmbed()
          .setAuthor({
            name: `ERROR`,
            iconURL: `${image.error}`
          })
          .setDescription(`The command you used **[${cmd}]** is not a valid command.\n\nIf you need any help with the commands use **G!help** for more info.`)
          .setColor(colour.error)
          .setThumbnail(`${client.user.avatarURL({
            dynamic: true,
            size: 4096
          })}`)
          .setFooter({
            text: `${client.user.tag} | V•${version}`,
            iconURL: `${client.user.avatarURL({
              dynamic: true,
              size: 4096
            })}`
          })
          .setTimestamp()
        ]
      });

    try {
      
      command.run(client, message, args);
      
    } catch (error) {
      
      await message.channel.send({
        embeds: [
          new MessageEmbed()
          .setAuthor({
            name: "ERROR",
            iconURL: `${image.error}`
          })
          .setColor(colour.error)
          .setDescription(`There was an error while executing the command.\n**ERROR :**\n${error}`)
          .setThumbnail(`${client.user.avatarURL({
            dynamic: true,
            size: 4096
          })}`)
          .setFooter({
            text: `${client.user.tag} | V•${version}`,
            iconURL: `${client.user.avatarURL({
              dynamic: true,
              size: 4096
            })}`
          })
          .setTimestamp()
        ]
      })
      
    };
  }
};