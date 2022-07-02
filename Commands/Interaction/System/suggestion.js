const {
  cwd
} = require("process");
const {
  MessageEmbed,
  WebhookClient
} = require("discord.js");
const {
  guilds,
  channels,
  colour,
  image
} = require(`${cwd()}/Structures/data.json`);




module.exports = {
  name: "suggestion",
  description: "Suggest Something for the bot.",
  category: "system",
  options: [
    {
      name: "type",
      description: "Type of Suggestion.",
      required: true,
      type: "STRING",
      choices: [
        {
          name: "command",
          value: "command"
        },
        {
          name: "event",
          value: "event"
        }
      ]
    },
    {
      name: "name",
      description: "Name of the Suggestion.",
      required: true,
      type: "STRING"
    },
    {
      name: "functionality",
      description: "Functionality of the Suggestion.",
      required: true,
      type: "STRING"
    }
  ],
  async execute(interaction, client) {
    const name = interaction.options.getString("name");
    const type = interaction.options.getString("type");
    const funcs = interaction.options.getString("functionality");

    const Bot = new WebhookClient({
      url: "https://discord.com/api/webhooks/979697971975323658/0NrkZWCPKBrLaj7iU6SEYxOHAEWCkpVj1QVbQS8cCMnyx-YGHrrc7n05E-NSzxQdmywe"
    });

    const Response = new MessageEmbed()
      .setAuthor({
        name: `${interaction.user.tag}`,
        iconURL: `${interaction.user.avatarURL({
          dynamic: true,
          size: 4096
        })}`
      })
      .setTitle("SUGGESTION")
      .setDescription(`**${interaction.user} has suggested a ${type} for the Bot.\n\nName : ${name}\n\nFunctionality : ${funcs}\n\nReact with ✅ if you like it \nReact with ❌ if you dislike it.**`)
      .setColor(colour.embed)
      .setThumbnail(`${interaction.user.avatarURL({
        dynamic: true,
        size : 4096
      })}`)
      .setFooter({
        text: `${client.user.tag}`,
        iconURL:  `${client.user.avatarURL({
          dynamic: true,
          size: 4096
        })}`
      })
      .setTimestamp()

    const success = new MessageEmbed()
      .setAuthor({
        name: "Success",
        iconURL: `${image.success}`
      })
      .setColor(colour.success)

    const failed = new MessageEmbed()
      .setAuthor({
        name: "Failed",
        iconURL: `${image.failed}`
      })
      .setColor(colour.failed)
      
      
    try {
      let guild = await client.guilds.cache.get(guilds.main)
      let channel = await guild.channels.fetch(`${channels.suggestion}`);
      
      let message = await channel.send({
      embeds: [Response]
      })
      
      message.react("✅");
      message.react("❌");

      success.setDescription(`Your **suggestion** is successfully posted in ${channel}`)

      await interaction.reply({
        embeds: [success]
      });
      
    } catch (err) {

      failed.setDescription(`${err}`)

      await interaction.reply({
        embeds: [failed]
      });

    };
  },
};