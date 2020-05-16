const Discord = require('discord.js');
exports.run = (client, message, args) => {
var mcPort = 25565
var ip = `evercraftsurvival.com`
const request = require('request');
var url = `http://mcapi.us/server/status?ip=${ip}&port=` + mcPort;
request(url, function (err, response, body) {
body = JSON.parse(body);
var durum = [];
if(body.status ) durum = `✅ **Açık!**`
if(!body.status ) durum = `❎ **Kapalı!**`

  let except = new Discord.RichEmbed()
  .setColor("DAR")
  .setAuthor(`${ip} Sunucu Bilgileri!`, client.user.avatarURL)
  .setDescription(`
Sunucu Durumu: ${durum}\n
Sunucu Ip: \`${ip}\`\n
Website Ip: \`${ip}\`\n
Sunucu Versiyonu: \`${body.server.name}\`\n
Max Kapasite: \`${body.players.max}\`\n
Online Oyuncu Sayısı: \`${body.players.now}/${body.players.max}\`\n
Sunucu Açıklaması: \`${body.motd}\`\n`)
.setImage(`http://status.mclive.eu/${ip}/${ip}/${mcPort}/banner.png`)
.setThumbnail(client.user.avatarURL)
message.channel.send(except)});
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ip'
}
