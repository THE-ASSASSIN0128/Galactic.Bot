module.exports = {
  name: "emit",
  description: "Events emitter.",
  aliases: [
    "em",
    "test"
  ],
  permissions: "ADMINISTRATOR",
  run: async(client, message, args) => {
    
    const choices = args[0];
    
    switch(choices) {
        case "GMA": choice = "guildMemberAdd"
        break;
        case "GMR": choice = "guildMemberRemove"
        break;
      };

    
    client.emit(choice, message.member)

    message.channel.send({
      content: `Emited ${choice} Event`
    });
  },
};

/*
  
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
};*/