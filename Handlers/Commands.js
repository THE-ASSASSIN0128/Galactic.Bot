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
  
  
  
 module.exports = async (client, PG, ascii) => { 
   const Table = new ascii("Command files"); 
   const ArrayofCommands = []; 
    
   Table.setHeading("Name", "Status"); 
    
   ( await PG(`${cwd()}/Commands/Interaction/*/*.js`)).map( async (file) => { 
     const command = require(file); 
  
     if (!command.name) 
     return Table.addRow(file.split("/")[7], "❌FAILED", "Missing a name"); 
  
     if (!command.description) 
     return Table.addRow(interaction.name, "❌FAILED", "Missing a description"); 
  
     if (command.permissions) { 
  
       if(Perms.includes(command.permissions)) { 
         command.defaultPermission = false 
       } else { 
        Table.addRow(command.name, "❌FAILED", "Permission is invalid"); 
       } 
     } 
  
     client.interactions.set(command.name, command); 
     ArrayofCommands.push(command); 
  
     const L = file.split("/"); 
      
     Table.addRow(`${L[7]}` ,"🟢Loaded"); 
   }) 
    
    
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