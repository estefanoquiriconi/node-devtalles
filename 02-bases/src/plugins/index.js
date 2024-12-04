const { getUUID } = require('./uuid.plugin.js')
const { getAge } = require('./get-age.plugin.js')
const { httpClient } = require('./http-client.plugin.js')


module.exports = {
  getUUID,
  getAge,
  httpClient
}