const { MessageEmbed } = require('discord.js')
const { musicCommandAllowed } = require('../../utils/functions')
const { convertTime } = require('../../utils/convert.js')
const ms = require('ms')

module.exports = {
  name: 'seek',
  aliases: [],
  category: 'Music',
  description: 'Seek the currently playing song',
  args: true,
  usage: '<10s || 10m || 10h>',
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

    const time = ms(args[0])
    const position = player.position
    const duration = player.queue.current.duration

    const emojiforward = message.client.emoji.forward
    const emojirewind = message.client.emoji.rewind

    const song = player.queue.current

    if (time <= duration) {
      if (time > position) {
        player.seek(time)
        let thing = new MessageEmbed()
          .setDescription(
            `${emojiforward} **Forward**\n[${song.title}](${song.uri})\n\`${convertTime(
              time,
            )} / ${convertTime(duration)}\``,
          )
          .setColor(message.client.embedColor)
          .setTimestamp()
          .setAuthor('Mewa Bot', client.config.mewaAvatar)
          .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
        return message.channel.send({ embeds: [thing] })
      } else {
        player.seek(time)
        let thing = new MessageEmbed()
          .setDescription(
            `${emojirewind} **Rewind**\n[${song.title}](${song.uri})\n\`${convertTime(time)} / ${convertTime(
              duration,
            )}\``,
          )
          .setColor(message.client.embedColor)
          .setTimestamp()
          .setAuthor('Mewa Bot', client.config.mewaAvatar)
          .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
        return message.channel.send({ embeds: [thing] })
      }
    } else {
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(`Seek duration exceeds Song duration.\nSong duration: \`${convertTime(duration)}\``)
        .setAuthor('Mewa Bot', client.config.mewaAvatar)
        .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
      return message.channel.send({ embeds: [thing] })
    }
  },
}
