import { LogEntity, LogSeverityLevel } from './log.entity'

describe('log.entity.test.ts, LogEntity', () => {
  const dataObj = {
    message: 'Hola mundo',
    level: LogSeverityLevel.high,
    origin: 'log.entity.test.ts',
  }

  test('should create a LogEntity intance', () => {
    const log = new LogEntity(dataObj)

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe(dataObj.message)
    expect(log.level).toBe(dataObj.level)
    expect(log.origin).toBe(dataObj.origin)
    expect(log.createAt).toBeInstanceOf(Date)
  })

  test('should create a LogEntity instance from json', () => {
    const json = `{"message":"Service http://google.com working","level":"low","createAt":"2025-01-05T01:16:05.403Z","origin":"check-service.ts"}`

    const log = LogEntity.fromJson(json)

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe('Service http://google.com working')
    expect(log.level).toBe('low')
    expect(log.origin).toBe('check-service.ts')
    expect(log.createAt).toBeInstanceOf(Date)
  })

  test('should create a LogEntity instance from object', () => {
    const log = LogEntity.fromObject(dataObj)
    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe(dataObj.message)
    expect(log.level).toBe(dataObj.level)
    expect(log.origin).toBe(dataObj.origin)
    expect(log.createAt).toBeInstanceOf(Date)
  })
})
