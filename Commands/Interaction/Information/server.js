const {
  MessageEmbed
} = require("discord.js");
const moment = require("moment");
const {
  colour
} = require(`${process.cwd()}/Structures/data.json`);





module.exports = {
  name: "server-info",
  description: "Replies with server information.",
  category: "Information",
  async execute(interaction, client) {
    let Guild = interaction.guild
    let Roles = Guild.roles.cache;
    let owner = await Guild.members.cache.get(Guild.ownerId);
    let Members = await Guild.members.fetch();
    let Channels = await Guild.channels.fetch();
    

    
    let server = new MessageEmbed()
      .addField("🏛️ Name", `${Guild.name}`)
      .addField("🆔 ID",`${Guild.id}`)
      .addField("📅 Created On",`${moment(Guild.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\n- ${moment(Guild.createdAt, "yyMMdd").fromNow()}`)
      .addField("👑 Owned by", `${owner}`)
      .addField(`👥 Members [${Guild.memberCount}]`, "More information will be added in next Update.")
      .addField(`💬 Channels [${Channels.size}]`, "More information will be added in the next update.")
      .addField(`🔐 Roles [${Roles.size}]`, "Use \`/roles\` to get a list of roles")
      .setColor(colour.bot)
      .setThumbnail(`${Guild.iconURL({
        dynamic: true,
        size: 4096
      })}`)

    interaction.reply({
      embeds: [server]
    });
  },
};