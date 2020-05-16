const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

let botid = ('706561738551853086') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL)
        .setColor('0x36393E')
        .setTitle(`<a:yildiz:707981485646544989> Yardım Menüsü <a:yildiz:707981485646544989>`)
        .setDescription(`<a:kristal:708040187346681969> | **${ayarlar.prefix}efekt** Efekt Komutlarını Gösterir! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}kullanıcı** Kullanıcı Komutlarını Gösterir! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}bot** Bot Komutlarını Gösterir! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}eğlence** Eğlence Komutlarını Gösterir!\n<a:kristal:708040187346681969> | **${ayarlar.prefix}yetkili** Yetkili Komutlarını Gösterir! \n`)
        .setThumbnail(client.user.avatarURL)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL)
        .setImage("https://i.imgyukle.com/2020/05/08/rzqdK0.jpg")  
    return message.channel.sendEmbed(embed);


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['y', 'help',],
  permLevel: 0,
};

exports.help = {
  name: 'yardım',
  description: 'Yardım Menüsünü Gösterir!',
  usage: 'yardım'
};
