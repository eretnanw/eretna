const Discord = require('discord.js');


exports.run = (client, message, args) => {
    if (!message.guild) {
      return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Eval;').setDescription(message.author.username + ', bu komutu direkt mesajda kullanamazsın.').setFooter('', client.user.avatarURL).setTimestamp()); }
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 2) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Efkar VS').setDescription(message.author.tag + ', kullanım: efkar-vs <@kullanıcı> <@kullanıcı> .').setFooter('', client.user.avatarURL).setTimestamp());
    var sans = ["%50'Kadar Cıktı","%100'Oldun","Bune Efkar Kardeşim Ya Yak Bi Dal Daha Benim İçin <a:cigara:707989863080919072>"]
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
      message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setTitle('Hangimiz Daha  Efkarlıyız').setDescription('Efkar...!').setFooter('Efkarlandınız.', client.user.avatarURL).setTimestamp())
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Hangimiz Daha  Efkarlıyız').setDescription('Efkarınız Ölçülüyor.').setFooter('%25.', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Hangimiz Daha  Efkarlıyız').setDescription('Efkarınız Ölçülüyor.').setFooter('%30.', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Hangimiz Daha  Efkarlıyız').setDescription('Efkarınız Ölçülüyor.').setFooter('%50.', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Hangimiz Daha  Efkarlıyız').setDescription('Efkarınız Ölçülüyor.').setFooter('%75.', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Hangimiz Daha  Efkarlıyız').setDescription('Efkarınız Ölçüldü!').setFooter('%100.', client.user.avatarURL).setTimestamp()))
      .then(nmsg => nmsg.edit(new Discord.RichEmbed().setColor('RANDOM').setTitle('Hangimiz Daha  Efkarlıyız').setDescription('Efkarlı Olan Kişi: **' + user.tag+'** Üzüldüm Neden Bu kadar Efkarlısın ki **'+ sonuc +'** Bidaha Yak Yak <a:cigara:707989863080919072>').setImage("https://i.hizliresim.com/2a2nrE.jpg").setFooter('İyi Efkarlar..', client.user.avatarURL).setTimestamp()))
        };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['efkarlı-vs', 'efkarlıkişilere-vs'],
  permLevel: 0
};

exports.help = {
  name: 'efkar-vs',
  description: 'Seçtiğiniz 2 kişiyi savaştırırsınız.',
  usage: '-efkar-vs <@kullanıcı> <@kullanıcı>'
};