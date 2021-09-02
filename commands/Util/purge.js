module.exports = {
  name: 'purge',
  aliases: ['clean', 'clear', 'remove'],
  category: 'Util',
  description: 'Usuwa daną liczbe wiadomosci (max. 100)',
  args: true,
  usage: '',
  permission: [],
  owner: false,
  execute: async (message, args, client, prefix) => {
    const num = args.join(' ').trim()
    if (isNaN(num) || parseInt(num <= 0)) return message.reply('Nieprawidłowa liczba')

    const number = parseInt(num)

    if (number > 100) return message.reply('Możesz usunąć maksymalnie 100 wiadomości')

    await message.channel.bulkDelete(number + 1, true)
  },
}
