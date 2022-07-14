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



const status = queue => `Volume: ${queue.volume}%\nFilter: ${queue.filters.join(', ') || 'Off'}\nLoop: ${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'}\nAutoplay: ${queue.autoplay ? 'On' : 'Off'}`




client.distube.on("playSong", async(queue, song) => {
  const msg = await queue.textChannel.send({content: "Processing ......"})
  
  const embed = new MessageEmbed()
    .setTitle("▶️ : Started Playing")
    .setDescription(`**Song :\n[${song.name}](${song.url})\nDuration :\n${song.formattedDuration}\nVoice Channel :\n${queue.voiceChannel}\nQueue :**\`\`\`\n${status(queue)}\n\`\`\``)
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
  
  msg.edit({
    content: null,
    embeds: [embed]
  })
});

/*client.distube
   .on('addList', (queue, playlist) => 
     queue.textChannel.send( 
       `${client.emotes.success} | Added \`${playlist.name}\` playlist (${ 
         playlist.songs.length 
       } songs) to queue\n${status(queue)}` 
     ) 
   ) 
   .on('error', (channel, e) => { 
     channel.send(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`) 
     console.error(e) 
   }) 
   .on('empty', channel => channel.send('Voice channel is empty! Leaving the channel...')) 
   .on('searchNoResult', (message, query) => 
     message.channel.send(`${client.emotes.error} | No result found for \`${query}\`!`) 
   ) 
   .on('finish', queue => queue.textChannel.send('Finished!'))*/