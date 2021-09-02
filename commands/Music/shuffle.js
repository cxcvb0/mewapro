const { MessageEmbed } = require('discord.js')
const { musicCommandAllowed } = require('../../utils/functions')

module.exports = {
  name: 'shuffle',
  category: 'Music',
  description: 'Shuffle queue',
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

    player.queue.shuffle()

    const emojishuffle = message.client.emoji.shuffle

    let thing = new MessageEmbed()
      .setDescription(`${emojishuffle} Shuffled the queue`)
      .setColor(message.client.embedColor)
      .setTimestamp()
      .setAuthor('Mewa Bot', client.config.mewaAvatar)
      .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
    return message.channel
      .send({ embeds: [thing] })
      .catch((error) => message.client.logger.log(error, 'error'))
  },
}
