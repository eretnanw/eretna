const Discord = require("discord.js");
const moment = require("moment");
const os = require('os');
require("moment-duration-format");
exports.run = async (bot, message, args) => {
  const duration = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");

  let msg = message
   const bunemq = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
   const annencilermaldır = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setFooter('EverCraft BOT  \'Buyur Benim İstatistiklerim', bot.user.avatarURL)
  .addField("» **Botun Sahibi**", "1Rip#7442  ")
  .addField("»  **Geliştirici** "," YOK  ")
  .addField("» **Bellek kullanımı**", (process.memoryUsage().heapUsed / 512 / 512).toFixed(2) + ' MB', true)
  .addField("» **Çalışma süresi**", bunemq)
  .addField('» **Müzik Çalınan Sunucu Sayısı**;', bot.voiceConnections.size)
  .addField('» **Kullanıcılar**:', bot.guilds.reduce((a, b) => a + b.memberCount, 0))
  .addField("» **Sunucular**", bot.guilds.size.toLocaleString(), true)
  .addField("» **Kanallar**", bot.channels.size.toLocaleString(), true)
  .addField("» **Discord.JS sürüm**", "v"+Discord.version, true)
  .addField("» **Node.JS sürüm**", `${process.version}`, true)
  .addField("» **Ping**", bot.ping+" ms", true)
  .addField("» **CPU**", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
  .addField("» **Bit**", `\`${os.arch()}\``, true)
  .addField("» **İşletim Sistemi**", `\`\`${os.platform()}\`\``)
  .addField("**» Bot Davet**", " [Davet Et](https://discord.com/oauth2/authorize?client_id=707223810411331674&scope=bot&permissions=2146958847)", )
  .addField("**» Destek Sunucusu**", " [Sunucumuza Katıl](https://discord.gg/9ANgshG)", )

 return message.channel.send(annencilermaldır);
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [ 'i'],
  permLevel: 0
};

exports.help = {
  name: "istatistik",
  description: "Bot i",
  usage: "istatistik"
};
