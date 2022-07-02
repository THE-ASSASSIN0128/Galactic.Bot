const { 
   Events 
} = require("../Validation/EventNames"); 
  
  
module.exports = async (client, PG, ascii) => { 
   const Table = new ascii("Event files"); 
  
   ( await PG(`${process.cwd()}/Events/*/*.js`)).map( async (file) => { 
     const event = require(file); 
  
     if (!Events.includes(event.name) || !event.name) { 
       const L = file.split("/"); 
       Table.addRow(`${event.name || "MISSING"}`, `❌Event name is invalid or missing: ${L[6] + `/` + L[7]}`); 
       return; 
     }; 
     if (event.once) { 
       client.once(event.name, (...args) => event.execute(...args, client)); 
     } else { 
       client.on(event.name, (...args) => event.execute(...args, client)); 
     }; 
     const L = file.split("/"); 
     Table.setHeading("Name", "Status"); 
     Table.addRow(`${L[6]}`, "🟢Loaded"); 
   }); 
    
   console.log(Table.toString()); 
 };