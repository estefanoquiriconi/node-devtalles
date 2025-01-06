import { LogEntity } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'
import { SendEmailLogs } from './send-email-logs'

describe('SendEmailLog UseCase', () => {
  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(false),
  }

  const mockLogRepository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should log in case of error', async () => {
    const result = await sendEmailLogs.execute('estefano@google.com')

    expect(result).toBe(false)
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalled()
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    )
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createAt: expect.any(Date),
      level: 'high',
      message: 'Error: Email log not sent',
      origin: 'send-email-log.ts',
    })
  })

  test('should call sendEmail and saveLog', async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(true)
    const result = await sendEmailLogs.execute('estefanoquiriconi@gmail.com')
    expect(result).toBe(true)
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1
    )
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    )
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createAt: expect.any(Date),
      level: 'low',
      message: 'Log email sent',
      origin: 'send-email-log.ts',
    })
  })
})
