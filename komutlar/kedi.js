const Discord = require('discord.js');
const superagent = require('superagent');


exports.run = async(client, message, args) => {
    let msg = await message.channel.send("Resimi arıyorum");

    let {body} = await superagent 
    .get('https://aws.random.cat/meow');
    if(!{body}) return message.channel.send("Bir hata oluştu. Tekrar deneyiniz.")

    const codeming = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setImage(body.file)
    .setTimestamp()
    message.channel.send(codeming)
    msg.delete();
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['cat'],
    permLevel: 0
};

exports.help = {
    name: "kedi",
    description: "",
    usage: "kedi"
};