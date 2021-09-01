module.exports = async (client, guild) => {
  client.users.fetch(client.config.ownerId).then((user) => {
    user.send(`🔔 Joined: ${guild.name} (${guild.id}) - ${guild.members.cache.size} members`)
  })
}
