const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');



var dmChannel = "708410664766406717"; // Burası bota gelen mesaj(DM)lerin loglanacağı kanalın ID'si


client.on("message", message => {
  var dm = client.channels.get(dmChannel);
  if (message.channel.type === "dm") {
    if (message.author.id === client.user.id) return;
    const embed = new Discord.RichEmbed()
      .setTitle(`${client.user.username} Dm`)
      .setTimestamp()
      .setColor("RANDOM")
      .setThumbnail(`${message.author.avatarURL}`)
      .addField("Gönderen", message.author.tag)
      .addField("Gönderen ID", message.author.id)
      .addField("Gönderilen Mesaj", message.content);
    dm.send(embed);

  }
});




const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});
//MOD LOG MESAJ SİLME

client.on("messageDelete", async message => {
  let mslog = await db.fetch(`mslog_${message.guild.id}`);
  if (!mslog) return;
  const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
  .setThumbnail(message.author.avatarURL) //dcs
  .setTitle("Mesaj Silme")
  .addField("**Mesajın Sahibi**", `<@${message.author.id}> **|** \`${message.author.id}\``)
  .addField("**Mesaj**", `${message.content}`)
  .setTimestamp()
  .setColor("RED")
  client.channels.get(mslog).send(embed)
});

//MMOD LOG MESAJ EDİTLEME

client.on("messageUpdate", async (oldMessage, newMessage) => {
  let mslog = await db.fetch(`mslog_${oldMessage.guild.id}`);
  if (!mslog) return;
  let embed = new Discord.RichEmbed()
  .setThumbnail(oldMessage.author.avatarURL) //dcs
  .setTitle("Mesaj Düzenleme")
  .addField("**Mesajın Sahibi**", `<@${oldMessage.author.id}> | **${oldMessage.author.id}**`)
  .addField("**Eski Mesajı**", `${oldMessage.content}`)
  .addField("**Yeni Mesajı**", `${newMessage.content}`)
  .setTimestamp()
  .setColor("RED")
  client.channels.get(mslog).send(embed)
});

//MOD LOG KANAL YÜKLEME

client.on("channelCreate", async(channel) => {
let kslog = await db.fetch(`kslog_${channel.guild.id}`);
  if (!kslog) return;
  const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
  let kanal;
  if (channel.type === "text") kanal = `<#${channel.id}>`
  if (channel.type === "voice") kanal = `\`${channel.name}\``
  let embed = new Discord.RichEmbed() //dcs
  .setThumbnail(entry.executor.avatarURL)
  .setTitle("Kanal Oluşturma")
  .addField("**Kanalı Oluşturan Kişi**", `<@${entry.executor.id}>`)
  .addField("**Oluşturduğu Kanal**", `${kanal}`)
  .setTimestamp()
  .setColor("GREEN")
  client.channels.get(kslog).send(embed)
  })

//MOD LOG KANAL SİLME

client.on("channelDelete", async(channel) => {
let kslog = await db.fetch(`kslog_${channel.guild.id}`);
  if (!kslog) return;
  const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
  .setThumbnail(entry.executor.avatarURL)
  .setTitle("Kanal Silme")
  .addField("**Kanalı Silen Kişi**", `<@${entry.executor.id}>`)
  .addField("**Silinen Kanal**", `\`${channel.name}\``)
  .setTimestamp()
  .setColor("RED") //dcs
  client.channels.get(kslog).send(embed)
  })

//MOD LOG ROL OLUŞTURMA

client.on("roleCreate", async(role) => {
let rslog = await db.fetch(`rslog_${role.guild.id}`);
  if (!rslog) return;
  const entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first()); //dcs
  let embed = new Discord.RichEmbed()
  .setThumbnail(entry.executor.avatarURL)
  .setTitle("Rol Oluşturma")
  .addField("**Rolü Oluşturan Kişi**", `<@${entry.executor.id}>`)
  .addField("**Oluşturulan Rol**", `\`${role.name}\` ** | ** \`${role.id}\``)
  .setTimestamp()
  .setColor("GREEN")
  client.channels.get(rslog).send(embed)
  })

//MOD LOG ROL SİLME

client.on("roleDelete", async(role) => {
let rslog = await db.fetch(`rslog_${role.guild.id}`);
  if (!rslog) return;
  const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
  .setThumbnail(entry.executor.avatarURL) //dcs
  .setTitle("Rol Silme")
  .addField("**Rolü Silen Kişi**", `<@${entry.executor.id}>`)
  .addField("**Silinen Rol**", `\`${role.name}\` ** | ** \`${role.id}\``)
  .setTimestamp()
  .setColor("RED")
  client.channels.get(rslog).send(embed)
  })

//MOD LOG EMOJİ YÜKLEME

client.on("emojiCreate", async(emoji) => {
  let eslog = await db.fetch(`eslog_${emoji.guild.id}`);
  if (!eslog) return;
  const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed() //dcs
  .setThumbnail(entry.executor.avatarURL)
  .setTitle("Emoji Oluşturma")
  .addField("**Emojiyi Oluşturan Kişi**", `<@${entry.executor.id}>`)
  .addField("**Emojinin Resmi**",  `ー ${emoji}`)
  .addField("**Oluşturulan Emoji**", `İsmi: \`${emoji.name}\``)
  .setTimestamp()
  .setColor("GREEN")
  client.channels.get(eslog).send(embed)
})

//MOD LOG EMOJİ SİLME

 client.on("emojiDelete", async(emoji) => {
  let eslog = await db.fetch(`eslog_${emoji.guild.id}`);
  if (!eslog) return;
  const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first()); //dcs
  let embed = new Discord.RichEmbed()
  .setThumbnail(entry.executor.avatarURL)
  .setTitle("Emoji Silme")
  .addField("**Emojiyi Silen Kişi**", `<@${entry.executor.id}>`)
  .addField("**Silinen Emoji**", `İsmi: ${emoji}`)
  .setTimestamp()
  .setColor("RED")
  client.channels.get(eslog).send(embed)
})

//MOD LOG EMOJİ GÜNCELLEME

client.on("emojiUpdate", async(oldEmoji, newEmoji) => {
  let eslog = await db.fetch(`eslog_${oldEmoji.guild.id}`); //dcs
  if (!eslog) return;
  const entry = await oldEmoji.guild.fetchAuditLogs({type: 'EMOJI_UPDATE'}).then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
  .setThumbnail(entry.executor.avatarURL)
  .setTitle("Emoji Güncelleme")
  .addField("**Emojiyi Güncelleyen Kişi**", `<@${entry.executor.id}>`)
  .addField("**Emojinin Resmi**", `ー ${newEmoji}`)
  .addField("**Güncellenmeden Önceki Emoji**", `Eski İsmi: \`${oldEmoji.name}\``)
  .addField("**Güncellendikten Sonraki Emoji**", `Yeni İsmi: \`${newEmoji.name}\``)
  .setTimestamp()
  .setColor("GREEN")
  client.channels.get(eslog).send(embed)
})

//MOD LOG SES KANALINA GİRİŞ-ÇIKIŞ BİLGİLENDİRME

client.on("voiceStateUpdate", async(oldMember, newMember) => {
let seslog = await db.fetch(`seslog_${oldMember.guild.id}`);
 if (!seslog) return;
  let embed = new Discord.RichEmbed() //dcs
.setThumbnail(oldMember.user.avatarURL)
 .setTitle("Ses Kanalına Giriş")
 .addField("**Kanala Giren Kişi**", `<@${oldMember.id}>`)
 .addField("**Şuanda Bulunduğu Kanal**", `\`${newMember.voiceChannel.name}\` **|** \`${newMember.voiceChannel.id}\``)
 .setTimestamp()
  .setColor("RED")
  client.channels.get(seslog).send(embed)
})

//MOD LOG BAN ATMA BİLGİLENDİRME

client.on("guildBanAdd", async(guild, user) => {
let banlog = await db.fetch(`banlog_${guild.id}`);
  if (!banlog) return;
  const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed() //dcs
  .setThumbnail(entry.executor.avatarURL)
  .setTitle("Sunucudan Yasaklama")
  .addField("**Kullanıcıyı Yasaklayan Yekili**", `<@${entry.executor.id}>`)
  .addField("**Yasaklanan Kullanıcı**", `\`*${user.tag}\` **|** \`${user.id}\``)
  .addField("**Yasaklanma Sebebi**", `${entry.reason}`)
  .setTimestamp()
  .setColor("RED")
  client.channels.get(banlog).send(embed)
})

//MOD LOG BAN AÇMA BİLGİLENDİRME

client.on("guildBanRemove", async(guild, user) => {
let banlog = await db.fetch(`banlog_${guild.id}`);
  if (!banlog) return;
  const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_REMOVE"}).then(audit => audit.entries.first());
  let embed = new Discord.RichEmbed()
  .setThumbnail(entry.executor.avatarURL)  //dcs
  .setTitle("Yasak Kaldırma")
  .addField("**Yasağı Kaldıran Yetkili**", `<@${entry.executor.id}>`)
  .addField("**Yasağı Kaldırılan Kullanıcı**", `\`${user.tag}\` **|** \`${user.id}\``)
  .setTimestamp()
  .setColor("GREEN")
  client.channels.get(banlog).send(embed)
})
/////////////////////////////// HOŞGELDİN
client.on('guildMemberAdd', async member => {
  let ozelhosgeldin = await db.fetch(`ozelhosgeldin_${member.guild.id}`)
  if (!ozelhosgeldin) return;
  member.send(ozelhosgeldin ? ozelhosgeldin.replace('-sunucu-', `\`${member.guild.name}\``) .replace('-kullanıcı-',`\`${member.user.tag}\``) : ``)
})

////////////////////////////// GÖRÜŞÜRÜZ
 client.on('guildMemberRemove', async member => {
  let ozelgorusuruz = await db.fetch(`ozelgorusuruz_${member.guild.id}`)
  if (!ozelgorusuruz) return;
  member.send(ozelgorusuruz ? ozelgorusuruz.replace('-sunucu-', `\`${member.guild.name}\``) .replace('-kullanıcı-',`\`${member.user.tag}\``) : ``)
})
client.on("message", async msg => {
  let member = msg.mentions.users.first() || msg.author;

  const reason = msg.content
    .split(" ")
    .slice(1) //dcs ekibi
    .join(" ");
  let akanal = await db.fetch(`destekkanal${msg.guild.id}`);
  if (msg.channel.id == akanal) {
    msg.channel.bulkDelete(1);
    let roleee = await db.fetch(`destekrole${msg.guild.id}`);
    let rl = msg.guild.roles.find(v => v.id === roleee);
    const listedChannels = [];
    let onl;
    msg.guild.members.forEach(p => {
      if (p.roles.has(rl.id)) {
        if (msg.guild.member(p).user.presence.status === "idle")
          onl = ":orange_circle:"
        if (msg.guild.member(p).user.presence.status === "dnd")
          onl = ":red_circle:"
        if (msg.guild.member(p).user.presence.status === "online")
          onl = ":green_circle:"
        if (msg.guild.member(p).user.presence.status === "offline")
          onl = ":white_circle:"

        listedChannels.push(`\`${p.user.tag}` + "\` " + onl );
      }
    });
    if (!msg.guild.channels.find(xx => xx.name === "DESTEK")) {
      await msg.guild.createChannel(`DESTEK`, "category");
    }
    let a = msg.guild.channels.find(xxx => xxx.name === "DESTEK");
    if (
      msg.guild.channels.some(
        kk =>
          kk.name ===
          `destek-${msg.guild.member(member).user.username.toLowerCase() +
            msg.guild.member(member).user.discriminator}`
      ) == true
    )
      return msg.author.send(`**Destek Sistemi Açma İşlemi Başarısız!\nSebep: \`Açılmış Zaten 1 Tane Destek Talebiniz Var.\`**`);
    msg.guild
      .createChannel(`destek-${member.tag}`, "text")
      .then(c => {
        let role2 = msg.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
        });
        c.overwritePermissions(msg.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });

        c.setParent(a);

        const embed = new Discord.RichEmbed() //dcs ekibi
          .setColor("DAR_BLUE")
          .setAuthor(`${client.user.username} | Destek Sistemi`)
          .addField(
            `Merhaba ${msg.author.username}!`,
            `Destek Yetkilileri burada seninle ilgilenecektir. \nDestek talebini kapatmak için \`${prefix}kapat\` yazabilirsin.`
          )
          .addField(`» Kullanıcı:`, `<@${msg.author.id}>`, true)
          .addField(`» Talep Konusu/Sebebi:`, `\`${msg.content}\``, true)
          .addField(
            `**Destek Rolündeki Yetkililer;**`,
`${listedChannels.join(`\n`)}`
          )
          .setFooter(`${client.user.username} | Destek Sistemi`)
          .setTimestamp();
        c.send({ embed: embed });
      })
      .catch(console.error);
  }
});

client.on("message", message => {
  if (message.content.toLowerCase().startsWith(prefix + `kapat`)) {
    if (!message.channel.name.startsWith(`destek-`))
      return message.channel.send(
        `Bu komut sadece Destek Talebi kanallarında kullanılablir!`
      );

    var deneme = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor(`Destek Talebi Kapatma İşlemi`)
      .setDescription(
        `Destek talebini kapatmayı onaylamak için, \n10 saniye içinde \`evet\` yazınız.`
      )
      .setFooter(`${client.user.username} | Destek Sistemi`);
    message.channel.send(deneme).then(m => {
      message.channel
        .awaitMessages(response => response.content === "evet", {
          max: 1,
          time: 10000,
          errors: ["time"]
        })
        .then(collected => {
          message.channel.delete(); //dcs ekibi
        })
        .catch(() => {
          m.edit("Destek Talebi kapatma isteğin zaman aşımına uğradı!").then(
            m2 => {
              m2.delete();
            },
            3000
          );
        });
    });
  }
});


client.login(ayarlar.token);0

//////////////////////////////////////////////
client.on("message", msg => {
  if (msg.content.toLowerCase() === "sa") {
    msg.channel.send("Aleyküm Selam, Hoş Geldin! <a:yildiz:707981485646544989>");
  }
});
/////////////////////////////////////////////////
