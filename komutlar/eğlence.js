const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

let botid = ('706561738551853086') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL)
        .setColor('0x36393E')
        .setTitle(`<a:yildiz:707981485646544989> Eğlence Komutları <a:yildiz2:707993383712325675>`)
      .setDescription(`<a:kristal:708040187346681969> | **${ayarlar.prefix}atış** İstediğiniz Kişiye Ateş Edersiniz!\n<a:kristal:708040187346681969> | **${ayarlar.prefix}dürt** İstediğiniz Kişiyi Dürtersiniz!\n<a:kristal:708040187346681969> | **${ayarlar.prefix}efkar-vs** Efkar VS'si Atarsınız!\n<a:kristal:708040187346681969> | **${ayarlar.prefix}slots** Slots Oynarsınız!\n<a:kristal:708040187346681969> | **${ayarlar.prefix}çekiç** Çekiç Fırlatırsınız!\n<a:kristal:708040187346681969> | **${ayarlar.prefix}stresçarkı** Stres Çarkı Çevirirsiniz!\n<a:kristal:708040187346681969> | **${ayarlar.prefix}8ball** 8Ball Oynarsınız! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}yazı-tura** Yazı Tura Atar! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}karıştır** Yazıları Karıştırır! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}kedi** Kedi Çıkar! \n <a:kristal:708040187346681969> | **${ayarlar.prefix}piyango** Piyango Oynarsınız! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}sunucuresmi** Sunucu Resmini Gösterir! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}kaçcm** Kaç CM Olduğunu Söyler! \n<a:kristal:708040187346681969>| **${ayarlar.prefix}espri** Espri Yapar! \n<a:kristal:708040187346681969>| **${ayarlar.prefix}vine** Vine Çıkar!\n<a:kristal:708040187346681969> | **${ayarlar.prefix}aşkölçer** Belirlediğiniz Kişiye Aşkınızı Ölçer! \n <a:kristal:708040187346681969> | **${ayarlar.prefix}fal** Falınızı Gösterir!`)  
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
  name: 'eğlence',
  description: 'Eğlence Menüsünü Gösterir',
  usage: 'eğlence'
};