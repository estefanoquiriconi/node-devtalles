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
    age: 30,
    country: 'AR',
  },
  {
    id: 2,
    name: 'Juan',
    age: 25,
    country: 'MX',
  },
]

export const getUserById = (
  id: number,
  callback: (err?: string, user?: User) => void
) => {
  const user = users.find((user) => user.id === id)

  if (!user) {
    return callback(`User not found with id ${id}`)
  }
  return callback(undefined, user)
}
