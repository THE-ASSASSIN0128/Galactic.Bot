const {
  Permissions
} = require("discord.js");



module.exports = {
  name: "emit",
  description: "Events emitter.",
  permissions: "ADMINISTRATOR",
  options: [
    {
      name: "member",
      description: "...",
      type: "STRING",
      required: true,
      choices: [
        {
          name: "GuildMemberAdd",
          value: "guildMemberAdd"
        },
        {
          name: "GuildMemberRemove",
          value: "guildMemberRemove"
        }
      ]
    }
  ],
  async execute(interaction, client) {
    const choices = interaction.options.getString("member");

    switch(choices) {
        case "guildMemberAdd" : {
          client.emit("guildMemberAdd", interaction.member)
          interaction.reply("Emitted the event")
        }
        break;
        case "guildMemberRemove" : {
          client.emit("guildMemberRemove", interaction.member)
        }
        break;
    }
  },
};