import { buildMakePerson } from '../../src/js-foundation/05-factory'

describe('js-foundation/05-factory', () => {
  const getUUID = () => '1234'
  const getAge = () => 27

  test('buildMakePerson should return a function', () => {
    const makePerson = buildMakePerson({ getUUID, getAge })
    expect(typeof makePerson).toBe('function')
  })

  test('makePerson should return a person', () => {
    const makePerson = buildMakePerson({ getUUID, getAge })

    const estefano = makePerson({ name: 'Estéfano', birthdate: '1997-09-18' })
    expect(estefano).toEqual({
      id: '1234',
      name: 'Estéfano',
      birthdate: '1997-09-18',
      age: 27,
    })
  })
})
