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
 const { 
   colour 
 } = require("./data.json");
  
  
  
  
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
 client.cooldown = new Collection(); 
  
  
 //Handlers 
 ["Events","Commands"].forEach(handler => { 
   require(`../Handlers/${handler}`)(client, PG, ascii); 
 }) 
  
 client.login(token)