const { MessageEmbed } = require('discord.js')
const { musicCommandAllowed } = require('../../utils/functions')

module.exports = {
  name: 'clearqueue',
  aliases: ['cq'],
  category: 'Music',
  description: 'Clear Queue',
  args: false,
  usage: '<Number of song in queue>',
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

    const player = message.client.manager.get(message.guild.id)

    if (!player.queue.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('There is no music playing.')
      return message.channel.send({ embeds: [thing] })
    }

    player.queue.clear()

    const emojieject = message.client.emoji.remove

    let thing = new MessageEmbed()
      .setColor(message.client.embedColor)
      .setTimestamp()
      .setDescription(`${emojieject} Removed all songs from the queue`)
    return message.channel.send({ embeds: [thing] })
  },
}
