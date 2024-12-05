interface User {
  id: number
  name: string
  age: number
  country: string
}

const users: User[] = [
  {
    id: 1,
    name: 'Estéfano',
    age: 27,
    country: 'AR',
  },
  {
    id: 2,
    name: 'Juan',
    age: 25,
    country: 'MX',
  },
]

export function getUserById(
  id: number,
  callback: (err?: string, user?: User) => void
) {
  const user = users.find(function (user) {
    return user.id === id
  })

  if (!user) {
    return callback(`User not found with id ${id}`)
  }
  return callback(undefined, user)
}
