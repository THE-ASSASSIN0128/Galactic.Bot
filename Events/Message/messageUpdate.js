const {
  MessageEmbed,
  Message,
  WebhookClient
} = require("discord.js");
const { colour } = require("../../data.json");


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
    
    
    const Bot = new WebhookClient({
      url: "https://discord.com/api/webhooks/882861049194373150/9AK7wcYHwn5OLMSbB2mmSmTNW8GyAyQF9B95ZGBSjV2C3x8TNYgDTq673Km4txI7qwNj"
    })

    Bot.send({
      embeds: [Log]
    });
  },
};