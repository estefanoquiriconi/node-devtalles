import { getUserById } from '../../src/js-foundation/03-callbacks'

describe('03-callbacks', () => {
  test('getUserById should return an error if user does not exist', done => {
    const id = 3

    getUserById(id, (err, user) => {
      expect(err).toBe(`User not found with id ${id}`)
      expect(user).toBeUndefined()
      done()
    })
  })

  test('getUserById should return a user if user exists', () => {
    const id = 1
    const estefano = {
      id: 1,
      name: 'Estéfano',
      age: 27,
      country: 'AR',
    }

    getUserById(id, (err, user) => {
      expect(err).toBeUndefined()
      expect(estefano).toEqual(user)
    })
  })
})
