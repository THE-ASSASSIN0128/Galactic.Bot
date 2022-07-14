const client = require(`${process.cwd()}/Structures/index.js`);
const {
  MessageEmbed
} = require("discord.js");
const {
  colour,
  image,
  url,
  emotes
} = require(`${process.cwd()}/Structures/data.json`);
const {
  version
} = require(`${process.cwd()}/package.json`);



client.distube.on("addSong", (queue, song) => {
  try {
    
    const addSong = new MessageEmbed()
      .setDescription(`**Added A Song to the Current Queue**\n\n**Song :\n[${song.name}](${song.url})\nDuration: ${song.formattedDuration}\nRequested By :\n${song.user.tag} | ${song.user}**`)
      .setColor(colour.bot)
      .setThumbnail(song.thumbnail)
      .setFooter({
        text: `${client.user.username} | V•${version}"`,
        iconURL: `${client.user.avatarURL({
          dynamic: true,
          size: 4096
        })}`
      })
      .setTimestamp()

    queue.textChannel.send({
      embeds: [addSong]
    });
    
  } catch (error) {
    queue.textChannel.send({
      content: `${error}`
    })
  };
});