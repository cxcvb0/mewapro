const { MessageEmbed } = require('discord.js')
const { musicCommandAllowed } = require('../../utils/functions')
const { convertTime } = require('../../utils/convert.js')
const { progressbar } = require('../../utils/progressbar.js')

module.exports = {
  name: 'nowplaying',
  aliases: ['np'],
  category: 'Music',
  description: 'Show now playing song',
  args: false,
  usage: '',
  permission: [],
  owner: false,
  player: true,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {
    const musicChannel = await client.db.get(`music_${message.guild.id}`)
    const [allowed, embedResponse] = musicCommandAllowed(musicChannel, message.channel.id)
    if (!allowed && embedResponse) return message.channel.send({ embeds: [embedResponse] })
    if (!allowed) return

    const player = message.client.manager.get(message.guild.id)

    if (!player.queue.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('There is no music playing.')
      return message.channel.send(thing)
    }

    const song = player.queue.current

    const emojimusic = message.client.emoji.music

    // Progress Bar
    var total = song.duration
    var current = player.position
    var size = 20
    var line = '▬'
    var slider = '🔘'

    let embed = new MessageEmbed()
      .setDescription(
        `${emojimusic} **Now Playing**\n[${song.title}](${song.uri}) - \`[${convertTime(
          song.duration,
        )}]\` [<@${song.requester.id}>]`,
      )
      .setThumbnail(song.displayThumbnail('3'))
      .setColor(message.client.embedColor)
      .addField('\u200b', progressbar(total, current, size, line, slider))
      .addField('\u200b', `\`${convertTime(current)} / ${convertTime(total)}\``)
    return message.channel.send({ embeds: [embed] })
  },
}
