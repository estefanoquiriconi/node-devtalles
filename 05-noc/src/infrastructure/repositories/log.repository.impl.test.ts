import { LogDataSource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'
import { LogRepositoryImpl } from './log.repository.impl'

describe('LogRepositoryImpl', () => {
  let logRepository: LogRepositoryImpl
  let logDatasourceMock: LogDataSource

  beforeEach(() => {
    logDatasourceMock = {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    }
    logRepository = new LogRepositoryImpl(logDatasourceMock)
  })

  test('saveLog a should call the datasource with arguments', async () => {
    const log = new LogEntity({
      message: 'test-log',
      level: LogSeverityLevel.low,
      origin: 'log.repository.impl.test.ts',
    })

    await logRepository.saveLog(log)

    expect(logDatasourceMock.saveLog).toHaveBeenCalledWith(log)
  })

  test('getLogs should call the datasource with arguments', async () => {
    await logRepository.getLogs(LogSeverityLevel.high)

    expect(logDatasourceMock.getLogs).toHaveBeenCalledWith(
      LogSeverityLevel.high
    )
  })
})
