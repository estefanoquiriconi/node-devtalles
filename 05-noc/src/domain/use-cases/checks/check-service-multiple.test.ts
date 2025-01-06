import { LogEntity } from '../../entities/log.entity'
import { CheckServiceMultiple } from './check-service-multiple'

describe('CheckServiceMultiple UseCase', () => {
  const mockRepositories = [
    {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    },
    {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    },
  ]

  const successCallback = jest.fn()
  const errorCallback = jest.fn()

  const checkService = new CheckServiceMultiple(
    mockRepositories,
    successCallback,
    errorCallback
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call successCallback when fetch return true', async () => {
    const wasOk = await checkService.execute('https://google.com')

    expect(wasOk).toBe(true)
    expect(successCallback).toHaveBeenCalled()
    expect(errorCallback).not.toHaveBeenCalled()
    mockRepositories.forEach((repository) => {
      expect(repository.saveLog).toHaveBeenCalled()
    })
  })

  test('should call errorCallback when fetch return false', async () => {
    const wasOk = await checkService.execute('https://urlnotvalid.com')

    expect(wasOk).toBe(false)
    expect(successCallback).not.toHaveBeenCalled()
    expect(errorCallback).toHaveBeenCalled()
    mockRepositories.forEach((repository) => {
      expect(repository.saveLog).toHaveBeenCalled()
    })
  })
})
