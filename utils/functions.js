const { MessageEmbed } = require('discord.js')
const axios = require('axios').default

const {
  whitelist,
  mewaAvatar,
  myAvatar,
  bmApi: { base, filter },
} = require('../config.json')

const getEmbed = () =>
  new MessageEmbed()
    .setColor('GREEN')
    .setTimestamp()
    .setAuthor('Mewa Bot', mewaAvatar)
    .setFooter('Made with 🖤 by xyz', myAvatar)

const musicCommandAllowed = (channel, source) => {
  if (!channel) return [false, getEmbed().setDescription('Music channel is not set')]
  else if (source !== channel) return [false, null]
  else return [true, null]
}

const parseServerData = ({
  attributes: { id, name, ip, port, players, maxPlayers, status, country, details },
}) => {
  let newStatus = '⚫'
  if (status === 'online') newStatus = '🟢'
  else if (status === 'offline') newStatus = '🔴'

  const queue = details['rust_queued_players']

  return {
    id,
    name: name.toUpperCase(),
    ip: `${ip}:${port}`,
    players: `${players}/${maxPlayers} (${queue})`,
    status: newStatus,
    country: `:flag_${country.toLowerCase()}:`,
  }
}

const fetchServer = async (args) => {
  const result = await axios.get(`${base}="${args.join('')}"&${filter}`)
  return result.data
}

const handleMute = async (message, mute) => {
  const voiceChannel = message.member.voice.channel
  if (!whitelist.includes(message.author.id)) {
    const embed = getEmbed().setDescription(`Nie masz wystarczających permisji`)

    return message.channel.send({ embeds: [embed] })
  }
  if (!voiceChannel) {
    const embed = getEmbed().setDescription(`Nie jesteś na żadnym kanale`)

    return message.channel.send({ embeds: [embed] })
  }

  const members = message.member.voice.channel.members.filter((member) => !whitelist.includes(member.id))

  for await (const member of members) {
    member[1].voice.setMute(mute)
  }
}

const handleMultipleServerResults = (data) => {
  let description = ''
  let index = 1
  data = data.slice(0, 10)
  data.forEach((server) => {
    const { name, ip, players, status } = parseServerData(server)
    description += `**${index++}.** \`${name}\` **|** \`${ip}\` **|** \`${players}\` **|** ${status}\n`
  })

  return getEmbed().setTitle(`${data.length} RESULTS`).setDescription(description)
}

const handleOneServerResult = (data) => {
  const { id, name, ip, players, status, country } = parseServerData(data)
  return getEmbed()
    .setTitle(name)
    .setURL('https://www.battlemetrics.com/servers/rust/' + id)
    .addField('IP', ip, true)
    .addField('Players', players, true)
    .addField('Status', status, true)
    .addField('Country', country, true)
}

module.exports = {
  handleMute,
  fetchServer,
  handleMultipleServerResults,
  handleOneServerResult,
  musicCommandAllowed,
}
