// const { getAge, getUUID } = require('../plugins')

interface BuildMakePersonOptions {
  getUUID: () => string;
  getAge: (birthdate: string) => number;
}

interface PersonOptions {
  name: string;
  birthdate: string;
}

const buildMakePerson = ({getUUID, getAge}: BuildMakePersonOptions) => {
  return ({ name, birthdate }: PersonOptions) => {
    return {
      id: getUUID(),
      name: name,
      birthdate: birthdate,
      age: getAge(birthdate)
    }
  }
}
