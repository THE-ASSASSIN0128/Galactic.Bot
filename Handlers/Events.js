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


module.exports = async(client, PG, ascii, queue, song) => {
  
  const Table = new ascii("event files");
  Table.setHeading("name", "status");
  
  (await PG(`${cwd()}/Events/*/*.js`)).map(
    async(file) => {

      const event = require(file);
      const N = file.split("/");

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