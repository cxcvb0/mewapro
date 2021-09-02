const { prefix } = require('../../config.json')

module.exports = async (client) => {
  client.manager.init(client.user.id)
  client.logger.log(`${client.user.username} is online!`, 'ready')
  client.logger.log(
    `Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`,
    'ready',
  )

  client.user.setActivity('with Mewa', { type: 'PLAYING' })
}
