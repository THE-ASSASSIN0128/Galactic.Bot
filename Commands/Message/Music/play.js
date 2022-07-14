const {
  MessageEmbed
} = require("discord.js");
const {
  cwd
} = require("process");
const {
  colour,
  image
} = require(`${cwd()}/Structures/data.json`);



module.exports = {
  name: 'play',
  description: "Start the music player",
  aliases: [
    'p',
    "pl",
    "pa"
  ],
  inVoiceChannel: true,
  run: async(client, message, args) => {
    
    const voiceChannel = message.member.voice.channel;
    const string = args.join(' ');

    if (!voiceChannel)
      return message.channel.send({
        embeds: [
          new MessageEmbed()
          .setAuthor({
            name: "FAILED",
            iconURL: `${image.failed}`
          })
          .setDescription("You are not in a voice channel. Join a voice channel then use the command again.")
          .setColor(colour.failed)
        ]
      });
    if (!string)
      return message.channel.send({
        embeds: [
          new MessageEmbed()
          .setAuthor({
            name: "ERROR",
            iconURL: `${image.error}`
          })
          .setDescription(`Please enter a song url or query to search.`)
          .setColor(colour.error)
        ]
      });
     
    client.distube.play(
      voiceChannel,
      string,
      {
        member: message.member,
        textChannel: message.channel,
        message
      }
    );
  },
};