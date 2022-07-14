const {
  Client,
  Intents,
  Collection
} = require('discord.js'); 
const fs = require('fs'); 
const token  = process.env['Token'];
const express = require('express');
const app = express();
const {
  promisify
} = require("util"); 
const {
  glob
} = require("glob");
const PG = promisify(glob);
const ascii = require("ascii-table");
const {
  cwd
} = require("process");
const {
  DisTube
} = require("distube");
const {
  SpotifyPlugin
} = require("@distube/spotify");
const {
  YtDlpPlugin
} = require("@distube/yt-dlp");
  
  
  
  
 //Website 
app.listen(3000, () => {
  console.log(`Bot's website is Ready!`)
}); 
  
app.get("/", (req,res) => { 
  res.send(`<h1>Bot is online</h1>`);
}); 
  
  
  
  
//Client  
const client = new Client({ 
   intents : 131071 
 }); 
  
  
//Collection  
client.commands = new Collection();
client.cooldowns = new Collection();
client.interactions = new Collection();
client.aliases = new Collection();

  
  
 
//Handlers
["Events","Commands","Interactions"].forEach(handler => {
   require(`${cwd()}/Handlers/${handler}`)(client, PG, ascii);
});

//Systems
client.distube = new DisTube(
  client,{
    leaveOnStop: true,
    emitNewSongOnly: false,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
      new SpotifyPlugin({
        emitEventsAfterFetching: true
      }),
      new YtDlpPlugin()
    ],
    youtubeDL: false
  }
);
module.exports = client;
  
client.login(token)