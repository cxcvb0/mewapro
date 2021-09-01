const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'ping',
  category: 'Information',
  description: 'Check Ping Bot',
  args: false,
  usage: '',
  permission: [],
  owner: false,
  execute: async (message, args, client, prefix) => {
    const timestamp = message.editedTimestamp ? message.editedTimestamp : message.createdTimestamp // Check if edited
    const latency = `\`\`\`ini\n[ ${Math.floor(message.createdTimestamp - timestamp)}ms ]\`\`\``
    const apiLatency = `\`\`\`ini\n[ ${Math.round(message.client.ws.ping)}ms ]\`\`\``
    const embed = new MessageEmbed()
      .setTitle(`Pong!`)
      .setDescription('')
      .addField('Latency', latency, true)
      .addField('API Latency', apiLatency, true)
      .setColor(client.embedColor)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor('Mewa Bot', client.config.mewaAvatar)
      .setFooter('Made with 🖤 by xyz', client.config.myAvatar)
      .setTimestamp()
    message.channel.send({ embeds: [embed] })
  },
}
