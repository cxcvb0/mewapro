const { MessageEmbed } = require('discord.js')
const { musicCommandAllowed } = require('../../utils/functions')

module.exports = {
  name: 'skipto',
  aliases: ['jump'],
  category: 'Music',
  description: 'Forward song',
  args: true,
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

    const position = Number(args[0])

    if (!position || position < 0 || position > player.queue.size) {
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(`Usage: ${message.client.prefix}volume <Number of song in queue>`)
        .setAuthor('Mewa Bot', client.config.mewaAvatar)
        .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
      return message.channel.send({ embeds: [thing] })
    }

    player.queue.remove(0, position - 1)
    player.stop()

    const emojijump = message.client.emoji.jump

    let thing = new MessageEmbed()
      .setDescription(`${emojijump} Forward **${position}** Songs`)
      .setColor(message.client.embedColor)
      .setTimestamp()
      .setAuthor('Mewa Bot', client.config.mewaAvatar)
      .setFooter('Made with 🖤 by xyz', client.config.myAvatar)

    return message.channel.send({ embeds: [thing] })
  },
}
