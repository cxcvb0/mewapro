module.exports = async (client, guild) => {
  client.users.fetch(client.config.ownerId).then((user) => {
    user.send(`🔔 Leaved: ${guild.name} (${guild.id}) - ${guild.members.cache.size} members`)
  })
}
