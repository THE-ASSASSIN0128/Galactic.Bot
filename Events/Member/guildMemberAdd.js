const {
  MessageEmbed,
  MessageAttachment
} = require("discord.js");
const {
  channels,
  colour,
  image
} = require(`../../data.json`);



module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    
    member.roles.add("800651662448001025");
    member.roles.add("800649532245016576");
    member.roles.add("868893960813297664");
    member.roles.add("848913146193641482");
    member.roles.add("800650426176634900");
    member.roles.add("853914139784249364");
    member.roles.add("800651108577050704");
    member.roles.add("885092653375569931");

    const Welcome = new MessageEmbed()
      .setDescription(`**<a:fearless:794821089636778024> Welcome to __${member.guild.name}__ <a:fearless:794821089636778024>**\n\n**<a:hi:799980185666977802> Hey, ${member.user.tag} we are happy to have you with us. We hope you will enjoy your stay in our server. If you have any doubts don't forget to let us know.\n\n<a:pins:855757951221366794> ${member.user} including you we now have ${member.guild.memberCount} members.\n\n<a:arrow_right_glow:849911113390882847> <#882462256204484618> Read and follow the rules.\n<a:arrow_right_glow:849911113390882847> <#856874999884152843> Take some self roles.\n<a:arrow_right_glow:849911113390882847> <#872370092283936818> Take your color role.\n<a:arrow_right_glow:849911113390882847> <#885955287398359121> For more information.\n<a:arrow_right_glow:849911113390882847> <#882478652208582736> Start chatting.**`)
      .setColor(colour.welcome)
      .setTimestamp()
    
    let channel = await member.guild.channels.fetch(channels.welcome);
    
    channel.send({
      embeds: [ Welcome ]
    });
  },
};