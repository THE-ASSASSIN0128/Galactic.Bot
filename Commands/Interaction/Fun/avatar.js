const {
  cwd
} = require("process");
const {
  MessageEmbed
} = require("discord.js");
const {
  colour
} = require(`${cwd()}/Structures/data.json`);



module.exports = {
  name: "avatar",
  category: "Fun",
  cooldown: 5,
  options: [
    {
      name: "user",
      description: "The member",
      type: "USER",
      required: false
    }
  ],
  description: "Replies with user Avatar",
  async execute(interaction, client) {

    const info = new MessageEmbed()
      .setDescription("**Avatar. For URL click on the image.**")
      .setColor(colour.embed)
      .setTimestamp()

    const User = await interaction.options.getUser("user") || interaction.user;
    
    try {
      info
        .setAuthor({
          name: `${User.tag}`,
          iconURL: `${User.avatarURL({
            dynamic: true,
            size: 4096
          })}`
        })
        .setImage(`${User.avatarURL({
          dynamic: true,
          size: 4096
        })}`)

      
      await interaction.reply({
        embeds: [info]
      }); 
    } catch (error) {
      console.log(error)
    };
  },
};