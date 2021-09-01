const { MessageEmbed, version } = require('discord.js')
const moment = require('moment')
require('moment-duration-format')
const os = require('os')
const si = require('systeminformation')

module.exports = {
  name: 'status',
  category: 'Information',
  aliases: ['stats'],
  description: 'Show status bot',
  args: false,
  usage: '',
  permission: [],
  owner: false,
  execute: async (message, args, client, prefix) => {
    const duration1 = moment.duration(message.client.uptime).format(' D [days], H [hrs], m [mins], s [secs]')
    const cpu = await si.cpu()
    const about = message.client.emoji.about
    const embed = new MessageEmbed()
      .setColor(message.client.embedColor)
      .setThumbnail(message.client.user.displayAvatarURL())
      .setDescription(
        `${about} **Status**
**= STATISTICS =**
**• Servers** : ${message.client.guilds.cache.size.toLocaleString()}
**• Channels** : ${message.client.channels.cache.size.toLocaleString()}
**• Users** : ${message.client.users.cache.size.toLocaleString()}
**• Discord.js** : v${version}
**• Node** : ${process.version}
**= SYSTEM =**
**• Platfrom** : ${os.type}
**• Uptime** : ${duration1}
**• CPU** :
> **• Cores** : ${cpu.cores}
> **• Model** : ${os.cpus()[0].model} 
> **• Speed** : ${os.cpus()[0].speed} MHz
**• MEMORY** :
> **• Total Memory** : ${(os.totalmem() / 1024 / 1024).toFixed(2)} Mbps
> **• Free Memory** : ${(os.freemem() / 1024 / 1024).toFixed(2)} Mbps
> **• Heap Total** : ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} Mbps
> **• Heap Usage** : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Mbps
`,
      )
      .setAuthor('Mewa Bot', client.config.mewaAvatar)
      .setFooter('Made with 🖤 by xyz', client.config.myAvatar)

    message.channel.send({ embeds: [embed] })
  },
}
