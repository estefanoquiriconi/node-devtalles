import { envs } from './envs.plugin'

describe('envs.plugin.test.ts', () => {
  test('should return env options', () => {
    console.log(envs)

    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'estefanoquiriconi@gmail.com',
      MAILER_SECRET_KEY: '123123123',
      PROD: true,
      MONGO_URL: 'mongodb://estefano:123456789@localhost:27017/',
      MONGO_DB_NAME: 'NOC_TEST',
      MONGO_USER: 'estefano',
      MONGO_PASS: '123456789',
    })
  })

  test('should return error if not found env', async () => {
    jest.resetModules()
    process.env.PORT = 'ABD'

    try {
      await import('./envs.plugin')

      expect(true).toBe(false)
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer')
    }
  })
})
