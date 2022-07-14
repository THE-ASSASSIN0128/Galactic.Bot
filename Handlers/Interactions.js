const { 
   cwd, 
   env 
} = require("process"); 
const {
  Perms
} = require(`${cwd()}/Validation/Permissions.js`); 
const {
  bot, 
  owner, 
  guilds
} = require(`${cwd()}/Structures/data.json`);  
  
  
  
module.exports = async(client, PG, ascii) => {
  const Table = new ascii("slash commands"); 
   
  const ArrayofCommands = [];

  (await PG(`${cwd()}/Commands/Interaction/*/*.js`)).map(
    async(file) => {
      
      const command = require(file);
      const I = file.split("/");
      Table.setHeading("file", "status");

      if (!command.name)
        return Table.addRow(I[7], "🔴failed", "missing a name");

      if (!command.description)
        return Table.addRow(I[7], "🔴failed", "missing a description");
        

      if (command.permissions)
        if (!Perms.includes(command.permissions))
        return Table.addRow(I[7], "🔴failed", "permission is missing or invalid");

      Table.addRow(I[7], "🟢loaded");
      client.interactions.set(command.name, command);
      ArrayofCommands.push(command);

    });

  console.log(Table.toString());
  
   
   
  client.on("ready", () => {
    try {
      const guild = client.guilds.cache.get(guilds.main);
      guild.commands.set(ArrayofCommands);
    } catch (error) {
      console.error(error);
    };
  });
};