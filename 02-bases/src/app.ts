// const {emailTemplate} = require('./js-foundation/01-template.js');
// require('./js-foundation/02-destructuring.js');
// const { getUserById, getUsById } = require('./js-foundation/04-arrow.js')
// const { buildMakePerson } = require('./js-foundation/05-factory.js')
// const { getAge, getUUID } = require('./plugins')
// const {getPokemonById} = require('./js-foundation/06-promises.js')
// const { buildLogger } = require('./plugins')

import { getPokemonNameById } from "./js-foundation/06-promises";
import { buildLogger } from "./plugins/logger.plugin";

const logger = buildLogger('app.js')

getPokemonNameById(3).then((name) => {
  console.log(name)
})

logger.log('Hola mundo')
logger.error('Esto es algo malo')
