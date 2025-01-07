import mongoose from 'mongoose'
import { envs } from '../../config/plugins/envs.plugin'
import { LogModel, MongoDatabase } from '../../data/mongo'
import { MongoLogDatasource } from './mongo-log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

describe('MongoLogDatasource', () => {
  const LogDataSource = new MongoLogDatasource()

  const log = new LogEntity({
    level: LogSeverityLevel.medium,
    message: 'test message',
    origin: 'mongo-log.datasource.test.ts',
  })

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    })
  })

  afterEach(async () => {
    await LogModel.deleteMany()
  })

  afterAll(async () => {
    mongoose.connection.close()
  })

  test('should create a log', async () => {
    const logSpy = jest.spyOn(console, 'log')

    await LogDataSource.saveLog(log)

    expect(logSpy).toHaveBeenCalledTimes(1)
    expect(logSpy).toHaveBeenCalledWith('Mongo log created', expect.any(String))
  })

  test('should get logs', async () => {
    await LogDataSource.saveLog(log)

    const logs = await LogDataSource.getLogs(LogSeverityLevel.medium)

    expect(logs.length).toBe(1)
    expect(logs[0].level).toBe(LogSeverityLevel.medium)
  })
})
