const { MessageEmbed } = require('discord.js')
const { musicCommandAllowed } = require('../../utils/functions')

module.exports = {
  name: '247',
  aliases: ['24h', '24/7', '24*7'],
  category: 'Music',
  description: '24/7 in voice channel',
  args: false,
  usage: '',
  permission: [],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const musicChannel = await client.db.get(`music_${message.guild.id}`)
    const [allowed, embed] = musicCommandAllowed(musicChannel, message.channel.id)
    if (!allowed && embed) return message.channel.send({ embeds: [embed] })
    if (!allowed) return

    const player = message.client.manager.players.get(message.guild.id)

    if (player.twentyFourSeven) {
      player.twentyFourSeven = false
      const embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`24/7 mode is now off.`)
        .setAuthor('Mewa Bot', client.config.mewaAvatar)
        .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
      return message.channel.send({ embeds: [embed] })
    } else {
      player.twentyFourSeven = true
      const embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`24/7 mode is now on.`)
        .setAuthor('Mewa Bot', client.config.mewaAvatar)
        .setFooter('Made with 🖤 by xyz', client.config.myAvatar)

      return message.channel.send({ embeds: [embed] })
    }
  },
}
