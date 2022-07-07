const { 
   cwd
} = require("process"); 
const {
  Events
} = require(`${cwd()}/Validation/EventNames.js`); 
const {
  bot, 
  owner, 
  guilds
} = require(`${cwd()}/Structures/data.json`);  


module.exports = async(client, PG, ascii) => {
  
  const Table = new ascii("event files");
  Table.setHeading("name", "status");
  
  (await PG(`${cwd()}/Events/*/*.js`)).map(
    async(file) => {

      const event = require(file);
      let N = file.split("/");
      
      
      if (!event.name || !Events.includes(event.name))   
        return Table.addRow(N[6], "❌failed", "name is invalid or missing");

      Table.addRow(N[6], "🟢loaded");

      try {
        
        if (event.once) {

          client.once(event.name, (...args) => event.execute(...args, client));
          
        } else {

          client.on(event.name, (...args) => event.execute(...args, client));
          
        };
      } catch (error) {

        console.error(error);

      };
    }
  );

  console.log(Table.toString());
  
};