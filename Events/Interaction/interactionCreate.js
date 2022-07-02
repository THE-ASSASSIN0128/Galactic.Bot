const {
  cwd
} = require("process");
const {
  MessageEmbed
} = require("discord.js");
const {
  image,
  colour
} = require(`${cwd()}/Structures/data.json`);



module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    
    if (interaction.isCommand() || interaction.isContextMenu() || interaction.isButton() || interaction.isSelectMenu()) {
      try {
      
      
        const command = client.interactions.get(interaction.commandName);
      
      
        if (!command) {
             
          interaction.reply({
            embeds: [
              new MessageEmbed()
              .setAuthor({
                name: "ERROR",
                iconURL: `${image.failed}`
              })
              .setDescription(`**Sorry**, This [${interaction.commandName}] command doesn't exist. Try using /help to get a command list.`)
              .setColor(colour.failed)
            ]
          }) && client.commands.delete(interaction.command);
            return;
          
        };
        
        if (command.permissions) {
          
          if (!interaction.member.permissions.has(command.permisssions)) {
            
            interaction.reply({
              embeds: [
              
                new MessageEmbed()
              
                .setAuthor({
                  name: "PERMISSION REQUIRED",
                  iconURL: `${image.failed}`
              })
                .setColor(colour.failed)
                .setDescription(`You do not have enough permission(s) to use this command.\n**Permission(s) Required :**\n${command.permissions}`)
              ]
            });
          }
          
          if (!interaction.guild.me.permissions.has(command.permissions)) {
            interaction.reply({
              embeds: [
                new MessageEmbed()
                .setAuthor({
                  name: "PERMISSION REQUIRED",
                  iconURL: `${image.failed}`
                })
                .setDescription(`I don't have enough permissions to execute this command.\n**Required Permission(s) :**\n ${command.permissions}`)
                .setColor(colour.failed)
              ]
            });
          };

        };
      
        await command.execute(interaction, client);
        
      } catch (error) {
        
        interaction.reply({
          embeds: [
            new MessageEmbed()
            .setAuthor({
              name: "ERROR",
              iconURL: `${image.error}`
            })
            .setColor(colour.error)
            .setDescription(`There was an error while executing the command.\n**ERROR :**\n${error}`)
          ]
        });
        console.error(error);
        
      };
    };
  },
};