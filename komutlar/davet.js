const Discord = require('discord.js');

exports.run = async (client, message, args) => {
	//kendi URL'lerini eklersn :D
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor("EverCraft BOT", client.user.avatarURL)
  .addField("Destek Sunucum", "[Tıkla!](https://discord.gg/NxFZ8nW)")
  .addField("Davet Linkim", "[Tıkla!](https://discord.com/oauth2/authorize?client_id=707223810411331674&scope=bot&permissions=2146958847)")
  message.channel.send({embed: embed})

};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['d', 'invite'],
	permLevel: 0,
	kategori: 'genel'
}

exports.help = {
	name: 'davet',
	description: 'Sistem hakkında bilgi gösterir.',
	usage: 'davet'
}
