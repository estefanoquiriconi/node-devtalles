const users = [
  {
    id: 1,
    name: 'Estéfano',
    age: 30,
    country: 'AR'
  },
  {
    id: 2,
    name: 'Juan',
    age: 25,
    country: 'MX'
  }
]

const getUserById = (id, callback) => {
  const user = users.find((user) => user.id === id)

  if (!user) {
    return callback(`User not found with id ${id}`)
  }
  return callback(null, user)
}

module.exports = {
  getUserById,
}