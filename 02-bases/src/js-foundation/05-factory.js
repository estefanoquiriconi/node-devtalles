const { getAge, getUUID } = require('../plugins')
const buildPerson = ({ name, birthdate }) => {

  return {
    id: getUUID(),
    name: name,
    birthdate: birthdate,
    age: getAge(birthdate)
  }
}

const obj = { name: 'Estéfano', birthdate: '1997-09-18' }
const john = buildPerson(obj)

console.log(john)
