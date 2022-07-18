const {
  MessageEmbed,
  Message,
  WebhookClient
} = require("discord.js");
const {
  cwd
} = require(`process`);
const {
  colour,
  channels
} = require(`${cwd()}/Structures/data.json`);


module.exports = {
  name: "messageUpdate",
  async execute(oldMessage, newMessage) {

    if (oldMessage.author.bot) return;

    if (oldMessage.content === newMessage.content) return;

    const Count = 1950;

    const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.lenght > Count ? "..." : "");
    
    const Edited = newMessage.content.slice(0, Count) + (newMessage.content.lenght > Count ? "..." : "");

    const Log = new MessageEmbed()
      .setTitle("User Logs : Message Update")
      .setDescription(`A [message](${newMessage.url}) by ${newMessage.author} was **edited** in ${newMessage.channel}.\n\n **Original :**\n\`\`\`\n${Original}\n\`\`\`\n**Edited :**\n\`\`\`\n${Edited}\n\`\`\``)
      .setColor(colour.log.msg)
      .setFooter({
        text: `Author: ${newMessage.author.tag}`,
        iconURL: `${newMessage.author.avatarURL({
          dynamic: true,
          size: 4096
        })}`
      })
      .setTimestamp()
    
    try {

      const channel = await newMessage.guild.channels.fetch(channels.useLogs);
      
      channel.send({
        embeds: [Log]
      });

    } catch (error) {

      console.error(error);

    };
  },
};