const { MessageEmbed } = require('discord.js')
const { musicCommandAllowed } = require('../../utils/functions')

module.exports = {
  name: 'remove',
  category: 'Music',
  description: 'Remove song from the queue',
  args: false,
  usage: '<Number of song in queue>',
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
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription('There is no music playing.')
        .setAuthor('Mewa Bot', client.config.mewaAvatar)
        .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
      return message.channel.send({ embeds: [thing] })
    }

    const position = Number(args[0]) - 1
    if (position > player.queue.size) {
      const number = position + 1
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(`No songs at number ${number}.\nTotal Songs: ${player.queue.size}`)
        .setAuthor('Mewa Bot', client.config.mewaAvatar)
        .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
      return message.channel.send({ embeds: [thing] })
    }

    const song = player.queue.remove(position)

    const emojieject = message.client.emoji.remove

    let thing = new MessageEmbed()
      .setColor(message.client.embedColor)
      .setTimestamp()
      .setDescription(`${emojieject} Removed\n[${song.track.title}](${song.track.uri})`)
      .setAuthor('Mewa Bot', client.config.mewaAvatar)
      .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
    return message.channel.send({ embeds: [thing] })
  },
}
