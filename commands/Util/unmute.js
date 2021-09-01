const { handleMute } = require('../../util/functions')

module.exports = {
  name: 'unmute',
  aliases: ['unsilence'],
  category: 'Util',
  description: 'Odcisza wszystkich na kanale',
  args: false,
  usage: '',
  permission: [],
  owner: false,
  execute: async (message, args, client, prefix) => {
    handleMute(message, false)
  },
}
