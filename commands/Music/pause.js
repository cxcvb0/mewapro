const { MessageEmbed } = require('discord.js')
const { musicCommandAllowed } = require('../../utils/functions')

module.exports = {
  name: 'pause',
  category: 'Music',
  description: 'Pause the currently playing music',
  args: false,
  usage: '',
  permission: [],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const musicChannel = await client.db.get(`music_${message.guild.id}`)
    const [allowed, embedResponse] = musicCommandAllowed(musicChannel, message.channel.id)
    if (!allowed && embedResponse) return message.channel.send({ embeds: [embedResponse] })
    if (!allowed) return

    const player = message.client.manager.get(message.guild.id)

    if (!player.queue.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('There is no music playing.')
      return message.channel.send({ embeds: [thing] })
    }

    const emojipause = message.client.emoji.pause

    if (player.paused) {
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(`${emojipause} The player is already paused.`)
        .setTimestamp()
      return message.channel.send({ embeds: [thing] })
    }

    player.pause(true)

    const song = player.queue.current

    let thing = new MessageEmbed()
      .setColor(message.client.embedColor)
      .setTimestamp()
      .setDescription(`${emojipause} **Paused**\n[${song.title}](${song.uri})`)
    return message.channel.send({ embeds: [thing] })
  },
}
