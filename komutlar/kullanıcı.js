const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

let botid = ('706561738551853086') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL)
        .setColor('0x36393E')
        .setTitle(`<a:yildiz:707981485646544989> Kullanıcı Komutları <a:yildiz2:707993383712325675>`)
        .setDescription(`<a:kristal:708040187346681969> | **${ayarlar.prefix}token** Botun Tokenini Gösterir!\n<a:kristal:708040187346681969> | **${ayarlar.prefix}ilginçbilgi** Size İlginç Bir Bilgi Verir!\n<a:kristal:708040187346681969> | **${ayarlar.prefix}iftar** İftara Ne Kadar Kaldığını Gösterir!\n<a:kristal:708040187346681969> | **${ayarlar.prefix}korona** Korona Virüs Ülkelerdeki Bilgilendirmesini Yazar!\n<a:kristal:708040187346681969> | **${ayarlar.prefix}davet-oluştur** Otomatik Sunucunun Daveti Oluşur!\n<a:kristal:708040187346681969> |  **${ayarlar.prefix}speedtest** SpeedTest Yaparsınız! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}sunucuresmi** Sunucu Resmini Gösterir! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}davetlerim** Davetlerinizi Gösterir! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}avatar** Avatarınızı Gösterir! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}kullanıcı-bilgi** Kullanıcı Bilgilerini Gösterir!`)  
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
  name: 'kullanıcı',
  description: 'Kullanıcı Komutlarını Gösterir!',
  usage: 'kullanıcı'
};