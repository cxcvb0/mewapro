const { MessageEmbed } = require('discord.js')
const { musicCommandAllowed } = require('../../utils/functions')

module.exports = {
  name: 'volume',
  aliases: ['v', 'vol'],
  category: 'Music',
  description: 'Change volume of currently playing music',
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

    const volumeEmoji = message.client.emoji.volumehigh

    if (!args.length) {
      let thing = new MessageEmbed()
        .setColor(message.client.embedColor)
        .setTimestamp()
        .setDescription(`${volumeEmoji} The current volume is: **${player.volume}%**`)
        .setAuthor('Mewa Bot', client.config.mewaAvatar)
        .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
      return message.channel.send({ embeds: [thing] })
    }

    const volume = Number(args[0])

    if (!volume || volume < 0 || volume > 100) {
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(`Usage: ${message.client.prefix}volume <Number of volume between 0 - 100>`)
        .setAuthor('Mewa Bot', client.config.mewaAvatar)
        .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
      return message.channel.send({ embeds: [thing] })
    }

    player.setVolume(volume)

    if (volume > player.volume) {
      var emojivolume = message.client.emoji.volumehigh
      let thing = new MessageEmbed()
        .setColor(message.client.embedColor)
        .setTimestamp()
        .setDescription(`${emojivolume} Volume set to: **${volume}%**`)
        .setAuthor('Mewa Bot', client.config.mewaAvatar)
        .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
      return message.channel.send({ embeds: [thing] })
    } else if (volume < player.volume) {
      var emojivolume = message.client.emoji.volumelow
      let thing = new MessageEmbed()
        .setColor(message.client.embedColor)
        .setTimestamp()
        .setDescription(`${emojivolume} Volume set to: **${volume}%**`)
        .setAuthor('Mewa Bot', client.config.mewaAvatar)
        .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
      return message.channel.send({ embeds: [thing] })
    } else {
      let thing = new MessageEmbed()
        .setColor(message.client.embedColor)
        .setTimestamp()
        .setDescription(`${volumeEmoji} Volume set to: **${volume}%**`)
        .setAuthor('Mewa Bot', client.config.mewaAvatar)
        .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
      return message.channel.send({ embeds: [thing] })
    }
  },
}
