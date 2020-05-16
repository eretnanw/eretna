const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

let botid = ('706561738551853086') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL)
        .setColor('0x36393E')
        .setTitle(`<a:yildiz:707981485646544989> Efekt Komutları <a:yildiz2:707993383712325675>`)
      .setDescription(`<a:kristal:708040187346681969> | **${ayarlar.prefix}afewlater** Avatarınıza Afew Later Efekti Ekler! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}wasted** Avatarınıza Wasted Efekti Ekler! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}win** Avatarınıza Winner Efekti Ekler! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}rip** Avatarınıza RIP Efekti Ekler! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}adamol** Adam Olursunuz! \n<a:kristal:708040187346681969> | **${ayarlar.prefix}kralol** Kral Olursunuz!`)  
        .setThumbnail(client.user.avatarURL)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL)
        .setImage("")  
    return message.channel.sendEmbed(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['efekt'],
  permLevel: 0,
};

exports.help = {
  name: 'efekt',
  description: 'Efekt Menüsünü Gösterir',
  usage: 'efekt'
};