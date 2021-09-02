const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'setmusic',
  category: 'Config',
  description: 'Set music channel',
  args: false,
  usage: '',
  aliases: ['setmusicchannel'],
  permission: [],
  owner: false,
  async execute(message, args, client) {
    if (!message.member.permissions.has('MANAGE_GUILD'))
      return message.channel.send('You must have `Manage Guild` permission to use this command.')
    if (!args[0]) {
      const embed = new MessageEmbed()
        .setDescription('Podaj id kanału')
        .setColor(client.embedColor)
        .setAuthor('Mewa Bot', client.config.mewaAvatar)
        .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
      return message.channel.send({ embeds: [embed] })
    }

    if (args[1]) {
      const embed = new MessageEmbed()
        .setDescription('Komenda przyjmuje tylko jeden argument - id kanału')
        .setColor(client.embedColor)
        .setAuthor('Mewa Bot', client.config.mewaAvatar)
        .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
      return message.channel.send({ embeds: [embed] })
    }

    client.db.set(`music_${message.guild.id}`, args[0])
    const embed = new MessageEmbed()
      .setDescription(`Ustawiono kanał muzyczny na \`${args[0]}\``)
      .setColor(client.embedColor)
      .setAuthor('Mewa Bot', client.config.mewaAvatar)
      .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
    await message.channel.send({ embeds: [embed] })
  },
}
