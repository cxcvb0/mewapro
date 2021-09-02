const { MessageEmbed } = require('discord.js')
const { musicCommandAllowed } = require('../../utils/functions')

module.exports = {
  name: 'resume',
  aliases: ['r'],
  category: 'Music',
  description: 'Resume currently playing music',
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

    const emojiresume = message.client.emoji.resume

    if (!player.paused) {
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(`${emojiresume} The player is already **resumed**.`)
        .setAuthor('Mewa Bot', client.config.mewaAvatar)
        .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
        .setTimestamp()
      return message.channel.send({ embeds: [thing] })
    }

    player.pause(false)

    let thing = new MessageEmbed()
      .setDescription(`${emojiresume} **Resumed**\n[${song.title}](${song.uri})`)
      .setColor(message.client.embedColor)
      .setAuthor('Mewa Bot', client.config.mewaAvatar)
      .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
      .setTimestamp()
    return message.channel.send({ embeds: [thing] })
  },
}
