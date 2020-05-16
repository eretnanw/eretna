const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

let botid = ('706561738551853086') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL)
        .setColor('0x36393E')
        .setTitle(`<a:yildiz:707981485646544989> Yetkili Komutları <a:yildiz2:707993383712325675>`)
        .setDescription(`<a:kristal:708040187346681969> | **${ayarlar.prefix}otorol** Belirlediğiniz Rolü Sunucuya Gelen Herkese Verir!\n<a:kristal:708040187346681969> | **${ayarlar.prefix}emoji-yukle** Belirlediğiniz Emojiyi Yükler!\n<a:kristal:708040187346681969> | **${ayarlar.prefix}sil** Belirlediğiniz Kadar Mesaj Siler!\n<a:kristal:708040187346681969> | **${ayarlar.prefix}rolbilgi** Belirlediğiniz Rol Hakkında Bilgi Verir!\n<a:kristal:708040187346681969> | **${ayarlar.prefix}yaz** Bota Yazı Yazdırır!\n<a:kristal:708040187346681969> | **${ayarlar.prefix}duyuru** Bota Duyuru Yaptırır! \n <a:kristal:708040187346681969> | **${ayarlar.prefix}temizle** Belirtdiğiniz Kadar Mesaj Temizler! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}fakemesaj** Başkasına Mesaj Yazdırırsınız!`)  
        .setThumbnail(client.user.avatarURL)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL)
        .setImage("")  
    return message.channel.sendEmbed(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 0,
};

exports.help = {
  name: 'yetkili',
  description: 'Yetkili Yardım Menüsünü Gösterir!',
  usage: 'yetkili'
};