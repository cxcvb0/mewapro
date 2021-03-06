const { MessageEmbed } = require('discord.js')
const { musicCommandAllowed } = require('../../utils/functions')

module.exports = {
  name: 'stop',
  category: 'Music',
  description: 'Stops the music',
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
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription('There is no music playing.')
        .setAuthor('Mewa Bot', client.config.mewaAvatar)
        .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
      return message.channel.send({ embeds: [thing] })
    }

    const autoplay = player.get('autoplay')
    if (autoplay === true) {
      player.set('autoplay', false)
    }

    player.stop()
    player.queue.clear()

    const emojistop = message.client.emoji.stop

    let thing = new MessageEmbed()
      .setColor(message.client.embedColor)
      .setTimestamp()
      .setDescription(`${emojistop} Stopped the music`)
      .setAuthor('Mewa Bot', client.config.mewaAvatar)
      .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
    message.channel.send({ embeds: [thing] })
  },
}
