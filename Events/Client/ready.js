const {
  cwd,
  env
} = require("process")
const mongoose = require("mongoose");
const DataBase = env["DataBase"];
const ascii = require("ascii-table");
const {
  guilds,
  channels,
  colour
} = require(`${cwd()}/Structures/data.json`);
const {
  MessageEmbed,
  WebhookClient
} = require("discord.js");


module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
    let guild = await client.guilds.cache.get(guilds.main);
    let channel = await guild.channels.fetch(channels.status);

    const Status = new MessageEmbed()
      .setAuthor({
        name: `${client.user.tag}`,
        iconURL: `${client.user.avatarURL({
          dynamic: true,
          size: 4096
        })}`
      })
      .setTitle("Bot is Online")
      .setDescription(`To make some upgrades or to fix some bugs the bot was offline. Now the bot is online again. You can enjoy using the bot.`)
      .setThumbnail(`${client.user.avatarURL({
        dynamic : true,
        size : 4096
      })}`)
      .setColor(colour.bot)
      .setTimestamp()

    const Bot = new WebhookClient({
      url: "https://discord.com/api/webhooks/979697971975323658/0NrkZWCPKBrLaj7iU6SEYxOHAEWCkpVj1QVbQS8cCMnyx-YGHrrc7n05E-NSzxQdmywe"
    });

    channel.send({
      embeds: [Status]
    });
    
		console.log(`Ready! Logged in as ${client.user.tag}`);
    client.user.setPresence({
      activities: [{
        type: "LISTENING",
        name: "/help"
      }],
      status: 5
    });
    const Table = new ascii("Bot's Information");
    
    Table.addRow("tag", `${client.user.tag}`);
    Table.addRow("id", `${client.user.id}`);

    console.log(Table.toString());
    
    
    if (!DataBase) return;
    try {
      mongoose.connect(DataBase,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      console.log("[🟢 DataBase] connected")
    } catch (err) {
      console.error(err)
    };
	},
};