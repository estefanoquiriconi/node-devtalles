// const {emailTemplate} = require('./js-foundation/01-template.js');
// require('./js-foundation/02-destructuring.js');
// const { getUserById, getUsById } = require('./js-foundation/04-arrow.js')
const { buildMakePerson } = require('./js-foundation/05-factory.js')
const { getAge, getUUID } = require('./plugins')


const makePerson = buildMakePerson({getUUID, getAge})

const estefano = makePerson({name: 'Estéfano', birthdate: '1997-09-18'});

console.log({estefano});

