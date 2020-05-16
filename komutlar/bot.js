const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

let botid = ('706561738551853086') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL)
        .setColor('0x36393E')
        .setTitle(`<a:yildiz:707981485646544989> Bot Komutları <a:yildiz2:707993383712325675>`)
        .setDescription(`<a:kristal:708040187346681969> | **${ayarlar.prefix}ping** Botun Pingini Gösterir! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}tavsiye** Tavsiyenizi Bildirirsiniz! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}şikayet** Şikayetinizi Bildirirsiniz! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}top10** Botun Top 10 Sunucusunu Gösterir! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}yapımcım** Botun Yapımcısını Gösterir! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}davet** Botun Davet Linklerini Gösterir! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}emojiler** Sunucudaki Emojileri Sayfa Sayfa Gösterir! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}istatistik** Bot İstatistiklerini Gösterir!`)
        .setThumbnail(client.user.avatarURL)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL)
        .setImage("")
    return message.channel.sendEmbed(embed);


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['help'],
  permLevel: 0,
};

exports.help = {
  name: 'bot',
  description: 'Bot Komutlarını Gösterir!',
  usage: 'bot'
};
