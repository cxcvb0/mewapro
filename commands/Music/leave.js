const { MessageEmbed } = require('discord.js')
const { musicCommandAllowed } = require('../../utils/functions')

module.exports = {
  name: 'leave',
  aliases: ['dc'],
  category: 'Music',
  description: 'Leave voice channel',
  args: false,
  usage: '',
  permission: [],
  owner: false,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const musicChannel = await client.db.get(`music_${message.guild.id}`)
    const [allowed, embedResponse] = musicCommandAllowed(musicChannel, message.channel.id)
    if (!allowed && embedResponse) return message.channel.send({ embeds: [embedResponse] })
    if (!allowed) return

    const player = message.client.manager.get(message.guild.id)

    const emojiLeave = message.client.emoji.leave

    player.destroy()

    let thing = new MessageEmbed()
      .setColor(message.client.embedColor)
      .setDescription(
        `${emojiLeave} **Leave the voice channel**\nThank you for using ${message.client.user.username}!`,
      )
    return message.channel.send({ embeds: [thing] })
  },
}
