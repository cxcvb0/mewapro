const { handleMute } = require('../../utils/functions')

module.exports = {
  name: 'silence',
  aliases: ['mute', 'cisza', 'silent'],
  category: 'Util',
  description: 'Wycisza wszystkich na kanale oprócz liderów',
  args: false,
  usage: '',
  permission: [],
  owner: false,
  execute: async (message, args, client, prefix) => {
    handleMute(message, true)
  },
}
