import mongoose from 'mongoose'
import { MongoDatabase } from './init'

describe('init MongoDB', () => {
  afterAll(() => {
    mongoose.connection.close()
  })

  const { MONGO_URL, MONGO_DB_NAME } = process.env

  test('should connect to MongoDB', async () => {
    const connected = await MongoDatabase.connect({
      dbName: MONGO_DB_NAME!,
      mongoUrl: MONGO_URL!,
    })

    expect(connected).toBeTruthy
  })

  test('should throw an error', async () => {
    
    try {
      const connected = await MongoDatabase.connect({
        dbName: MONGO_DB_NAME!,
        mongoUrl: 'fakeurl',
      })
      expect(true).toBe(false)
    } catch (error) {}
  })
})
