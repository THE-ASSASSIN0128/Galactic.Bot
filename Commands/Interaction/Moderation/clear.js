const {
  cwd
} = require("process");
const wait = require("timers/promises").setTimeout;
const {
  MessageEmbed
} = require("discord.js");
const {
  colour
} = require(`${cwd()}/Structures/data.json`);


module.exports = {
  name: "clear",
  category: "Moderation",
  description: "Delete a number of messages in a channel.",
  permissions: "MANAGE_MESSAGES",
  options: [
    {
      name: "amount",
      description: "Amount of Message to Delete",
      type: "INTEGER",
      required: true
    },
    {
      name: "user",
      description: "Filter Messages by user",
      type: "USER",
      required: false
    }
  ],
  async execute(interaction, client) {
    
    let amount = interaction.options.getInteger("amount");
    let User = interaction.options.getUser("user");
    let Response = new MessageEmbed().setColor(colour.bot)

    const Messages = await interaction.channel.messages.fetch();

    if (User) {
      let i = 0
      const filtered = [];
      (await Messages).filter((m)=> {
        if(m.author.id === User.id && amount > i) {
          filtered.push(m)
          i++;
        }
      })
      interaction.channel.bulkDelete(filtered, true).then(async (messages) => {
        Response.setDescription(`Deleted **__${messages.size}__** Messages of **${User.tag}**.`)
        interaction.reply({
          embeds: [Response]
        })
        await wait (5000); 
        interaction.deleteReply();
      }) 
    } else {
      await interaction.channel.bulkDelete(amount, true).then(
        async (messages) => {
          Response
            .setDescription(`Deleted **__${messages.size}__** Messages.`)
        
          await interaction.reply({
            embeds: [Response]
          });
          await wait (5000);
          interaction.deleteReply();
        });
    };
  },
};