exports.run = async(client, message, args) => {//Efe
  let user = message.mentions.users.first() || message.author;
  if(!user) return message.channel.send("Birisini Etiketle")
 let invites = await message.guild.fetchInvites() 
  let regular = invites.array().find(invite => invite.inviter.id === user.id) ? invites.find(invite => invite.inviter.id === user.id).uses : 0

message.channel.send(`Toplam **${regular}** davetin var!`) 
//Efe
};
exports.conf = {
  aliases: []//Efe
}
exports.help = {
  name: "davetlerim"
}