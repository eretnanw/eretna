const Discord = require('discord.js');

exports.run = async(client, msg, args) => {
if (msg.channel.type !== "text") return;
const limit = args[0] ? args[0] : 0;
  if(!limit) {
              var embed = new Discord.RichEmbed()
                .setDescription(`Doğru kullanım: \`-yavaşmod [0/10]\``)
                .setColor("RANDOM")
                .setTimestamp() 
            msg.channel.send({embed})
            return
          }
if (limit > 10) {
    return msg.channel.sendEmbed(new Discord.RichEmbed().setDescription("Yavaş Mod limiti maksimum **10** saniye olabilir.").setColor("RANDOM"));
}
    msg.channel.sendEmbed(new Discord.RichEmbed().setDescription(`📥 **| Başarılı,** bu odada kullanıcılar \`${limit}\` saniye aralıklarla mesaj gönderebilecek.`).setColor("RANDOM"));
var request = require('request');
request({
    url: `https://discordapp.com/api/v7/channels/${msg.channel.id}`,
    method: "PATCH",
    json: {
        rate_limit_per_user: limit
    },
    headers: {
        "Authorization": `Bot ${client.ayarlar.token}`
    },
})};


exports.conf = {
	enabled: true, 
	guildOnly: true,
	aliases: ['yavaş-mod',"slowmode"],
	permLevel: 3,
}

exports.help = { 
	name: 'yavaşmod',
	description: 'Yavaşlık Modunu Ayarlarsınız.',
	usage: 'özel' 
}