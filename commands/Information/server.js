const { fetchServer, handleMultipleServerResults, handleOneServerResult } = require('../../utils/functions')

module.exports = {
  name: 'server',
  category: 'Information',
  description: 'Zwraca informacje o serverze',
  args: true,
  usage: '',
  permission: [],
  owner: false,
  execute: async (message, args, client, prefix) => {
    const server = await fetchServer(args)
    if (!server || !server.data || server.data.length === 0) return message.reply('Nieoczekiwany błąd!')
    const { data } = server

    let embed

    if (data.length > 1) embed = handleMultipleServerResults(data)
    else embed = handleOneServerResult(data[0])

    return message.channel.send({ embeds: [embed] })
  },
}
