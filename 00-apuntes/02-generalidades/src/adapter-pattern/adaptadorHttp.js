const axios = require('axios')

module.exports = {
  get: (url) => axios.get(url),
}
