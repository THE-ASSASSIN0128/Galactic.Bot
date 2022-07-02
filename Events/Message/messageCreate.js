const {
  cwd
} = require("process");
const {
  bot
} = require(`${cwd()}/Structures/data.json`);



module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    const prefix = new RegExp(`<@!?${client.user.id}>( |)$`);

    if (message.content.match(prefix)) {
      return message.channel.send(`My prefix is **__${bot.prefix}__**`)
    };
    if (!message.content.startsWith(bot.prefix)) return;
    if (message.author.bot) return;
    if (!message.guild) return;
    
    if (!message.member)
      message.member = message.guild.fetchMember(message)

    const args = message.content
      .slice(bot.prefix.length)
      .trim()
      .split(/ +/g);

    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    
    if (command) command.execute(client, message, args);
  },
};