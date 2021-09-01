module.exports = async (client, node, reason) => {
  console.log(reason)
  client.logger.log(`Node "${node.options.identifier}" disconnect because ${reason}.`, 'warn')
}
