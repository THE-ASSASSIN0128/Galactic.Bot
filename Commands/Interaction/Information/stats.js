const {
  cwd
} = require("process");
const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton
} = require("discord.js");
const {
  connection
} = require("mongoose");
const {
  colour,
  url,
  owner
} = require(`${cwd()}/Structures/data.json`);
const {
  mongoose
} = require("mongoose");
const {
  version
} = require(`${cwd()}/package.json`);
const moment = require("moment");
require(`${cwd()}/Events/Client/ready.js`);




module.exports = {
  name: "stats",
  category: "Information",
  description: "Replies with the bots currnet status.",
  async execute(interaction, client) {
    
    let uptime = Math.floor (client.uptime / 1000)

    let days = Math.floor(uptime / 86400) 
    let hours = Math.floor(uptime / 3600) % 24 
    let minutes = Math.floor(uptime / 60) % 60 
      let seconds = Math.floor(uptime) % 60 
         let webLatency = new Date() - interaction.createdAt 
           
    let apiLatency = client.ws.ping
      let totalLatency = webLatency + apiLatency
    let emLatency = {
      Green: '🟢',
      Yellow: '🟡',
      Red: '🔴'
    };
    let king = interaction.guild.members.cache.get(owner.id)

/*
           .addField(`📡 Websocket Latency`, `\`${webLatency <= 200 ? emLatency.Green : webLatency <= 400 ? emLatency.Yellow : emLatency.Red}\` \`${webLatency}\`ms`)
           .addField(`🛰 API Latency`, `\`${apiLatency <= 200 ? emLatency.Green : apiLatency <= 400 ? emLatency.Yellow : emLatency.Red}\` \`${apiLatency}\`ms`)
           .addField(`⏲ Uptime`, `\`${days}Days\` : \`${hours}Hrs\` : \`${minutes}Mins\` : \`${seconds}Secs\``)
           .setFooter({
             text: `${client.user.username} • v${version}*/
    
    let Status = new MessageEmbed()
      .setTitle("GENERAL INFO")
      .setDescription(`**🪧 Name :** ${client.user.username} | ${client.user}\n**🏷️ Tag :** ${client.user.tag}\n\**⚙️ Version :** ${version}\n**👑 Owner :** ${king.user.tag} | ${king}\n**🌐 Website :** Coming soon.\n\n**\`\`\`\nStay tuned for more updates.\n\`\`\`**`)
      .setColor(colour.embed)
      .setThumbnail(`${client.user.avatarURL({
        dynamic: true,
        size: 4096
      })}`)
      .addField("BOT INFO", `**❕ Status** :  [\`🟢\`] Online\n**🏓 Ping** : ${client.ws.ping}ms\n**⏱️ Uptime** :\n\`\`\`\n${days}Days, ${hours}Hours, ${minutes}Minutes, ${seconds}Seconds\n\`\`\``)
      .addField(`DataBase INFO`, `**🪧 Name :** MongoDB\n**❕ Status :** ${switchTo(connection.readyState)}`)
      .addField("HOST & LIBRARY INFO", '**🪧 Name :** [repl.it](https://repl.it)\n📚 **Library :** discord.js | V•13.8.0')
      .addField("**GitHub Repository**",`**🪧 Name :** Galactic.Bot\n**🔗 Link :** [THE-ASSASSIN0128/Galactic.Bot](https://github.com/THE-ASSASSIN0128/Galactic.Bot)\n`)

    const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Select me',
							description: 'This is a description',
							value: 'first_option',
						},
						{
							label: 'You can select me too',
							description: 'This is also a description',
							value: 'second_option',
						},
					]),
			);
    
    await interaction.reply({
      embeds: [ Status ]
    });
  }
};



function switchTo(val) {
  var status = " ";
  switch(val) {
    case 0: status = `[\`🔴\`] Disconnected`
    break;
    case 1: status = `[\`🟢\`] Connected`
    break;
    case 2: status = `[\`🟡\`] Connecting`
    break;
    case 3: status = `[\`🟣\`] Disconnecting`
    break;
  };
  return status;
};