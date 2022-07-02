const {
  cwd
} = require("process");
const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
  MessageAttachment
} = require('discord.js'); 
const {
  author,
  version
} = require(`${process.cwd()}/package.json`);
const ms = require('ms');
const {
  colour,
  owner,
  image
} = require(`${cwd()}/Structures/data.json`);



 module.exports = { 
     name: 'ping', 
     cooldown: 15,
     category: 'Info',
   description: '🏓 Show the bot\'s Latency to the Discord API.',
     async execute(interaction, client) {
       let days = Math.floor(client.uptime / 86400000)
       let hours = Math.floor(client.uptime / 3600000) % 24
       let minutes = Math.floor(client.uptime / 60000) % 60
         let seconds = Math.floor(client.uptime / 1000) % 60
       
       let webLatency = new Date() - interaction.createdAt 
       let apiLatency = client.ws.ping
       
       let emLatency = {
           Green: '🟢',
           Yellow: '🟡',
           Red: '🔴'          
         };

         
       let latancy = new MessageEmbed()
         .setColor(colour.embed)
         .setTitle(`Latency And API Ping`)
         .addField(`📡 Websocket Latency`, `\`${webLatency <= 200 ? emLatency.Green : webLatency <= 400 ? emLatency.Yellow : emLatency.Red}\` \`${webLatency}\`ms`)
          .addField(`🛰 API Latency`, `\`${apiLatency <= 200 ? emLatency.Green : apiLatency <= 400 ? emLatency.Yellow : emLatency.Red}\` \`${apiLatency}\`ms`)
          .addField(`⏲ Uptime`, `\`${days}Days\` : \`${hours}Hrs\` : \`${minutes}Mins\` : \`${seconds}Secs\``)
          .setFooter({
            text: `${client.user.username} • v${version}`,
            iconURL: `${client.user.avatarURL({
              dynamic: true,
              size: 4096
            })}`
          })
         .setTimestamp()
       
       interaction.reply({
         embeds: [latancy]
       });
  },
};