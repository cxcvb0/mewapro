const { MessageEmbed } = require('discord.js')

module.exports = async (client, player, track, payload) => {
  console.error(payload.error)

  const channel = client.channels.cache.get(player.textChannel)
  const thing = new MessageEmbed()
    .setColor('RED')
    .setDescription('❌ Error when loading song! Track is error')
    .setAuthor('Mewa Bot', client.config.mewaAvatar)
    .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
  channel.send({ embeds: [thing] })
  client.logger.log(`Error when loading song! Track is error in [${player.guild}]`, 'error')
  if (!player.voiceChannel) player.destroy()
}
