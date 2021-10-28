//SINGLE SERVER ONLY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const Discord = require("discord.js");
const client = new Discord.Client();
const token = require("./modules/token");

client.login(process.env.token); 
global.client = client;

client.on("ready", () => {
  console.log("Logged in as " + client.user.tag);
});

client.on("guildMemberAdd", member => {
  const id = token.generateToken(member.user.id);
  const welcome = new Discord.MessageEmbed()
  .setTitle("Captcha")
  .setDescription(`To get access to the rest of the server, you need to complete a captcha.\n https://`+process.env.websiteurl+`/verify/${id}`);
  member.send(welcome);
});

require("./server");