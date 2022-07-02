const mongoose = require("mongoose");
const DataBase = process.env["DataBase"];
const ascii = require("ascii-table");
const { guilds, channels, colour } = require("../../data.json");
const { MessageEmbed, WebhookClient } = require("discord.js");


module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
    let guild = await client.guilds.cache.get(guilds.main);
    let channel = await guild.channels.fetch(channels.status);

    const Status = new MessageEmbed()
      .setTitle(`${client.user.tag}`)
      .setDescription(`**The __Bot__ is now Online.**`)
      .setThumbnail(`${client.user.avatarURL({
        dynamic : true,
        size : 4096
      })}`)
      .setColor(colour.embed)
      .setTimestamp()

    const Bot = new WebhookClient({
      url: "https://discord.com/api/webhooks/979697971975323658/0NrkZWCPKBrLaj7iU6SEYxOHAEWCkpVj1QVbQS8cCMnyx-YGHrrc7n05E-NSzxQdmywe"
    });

    /*channel.send({
      embeds: [Status]
    });*/
    
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