const Discord = require('discord.js');


exports.run = function(client, message, args) {
//Komutun Kodları
  const m = args.join(' ');
  if(!m) return message.channel.send('**⚙️ Bir miktar girmelisiniz!**');
  if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('**:xx: Bu işlem için gerekli izne sahip değilsiniz!**');
  if(m < 2) return message.channel.send('⚙️ **En az 2 mesaj silebilirim!**')
 if(m>100) return message.channel.send('**⚙️ En fazla 100 mesaj silebilirim!**')
  message.channel.bulkDelete(m);
  

  message.channel.send(
  new Discord.RichEmbed()
    .setTitle('⚙️ **Başarılı!**')
    .setDescription('**Başarı ile __'+m+'__ mesaj sildim! ⚙️ <a:onay3:707223478780297328>**')
  .setColor('0x36393E')
  ).then(i=>{
    i.react(' ⚙️ ')
  }  
  )
};

exports.conf = {
  enabled: true,//True => Komut açık, False => Komut kapalı 
  guildOnly: false, //True => Sadece Servere Özel, False => Heryerde kullanılabilir
  aliases: ['temizle','delete','sil'],//Komutun farklı kullanımları ÖR: !ping, !p
  permLevel: 0, //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
  kategori:'kullanıcı'
};

exports.help = {
  name: 'sil',
  description: 'Belirlediğiniz miktarda mesaj siler',
  category:'yetkili',
  usage: 'sil 100'
} 