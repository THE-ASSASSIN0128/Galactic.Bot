const { 
   cwd
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
  const Table = new ascii("message commands"); 

  (await PG(`${cwd()}/Commands/Message/*/*.js`)).map(
    async(file) => {
      
      const command = require(file);
      const I = file.split("/");

      if (!command.name)
        return Table.addRow(I[7], "🔴failed", "missing a name");

      if (!command.description)
        return Table.addRow(I[7], "🔴failed", "missing a description");
        

      if (command.permissions)
        if (!Perms.includes(command.permissions))
        return Table.addRow(I[7], "🔴failed", "permission is missing or invalid");

      
      client.commands.set(command.name, command);
      
      if (command.aliases)
        command.aliases.forEach(
          async(alias) =>
            client.aliases.set(alias, command.name));
  
  Table.setHeading("file", "status");
  Table.addRow(I[7], "🟢loaded");

    });

  console.log(Table.toString());
  
};