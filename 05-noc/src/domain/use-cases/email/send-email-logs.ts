import { EmailService } from '../../../presentation/email/email.service'
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'

interface SendEmailLogUseCase {
  execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendEmailLogUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]) {
    try {
      const sent = this.emailService.sendEmailWithFileSystemLogs(to)
      if (!sent) {
        throw new Error('Email log not sent')
      }
      const log = new LogEntity({
        message: `Log email sent`,
        level: LogSeverityLevel.low,
        origin: 'send-email-log.ts',
      })
      this.logRepository.saveLog(log)

      return true
    } catch (error) {
      const log = new LogEntity({
        message: `${error}`,
        level: LogSeverityLevel.high,
        origin: 'send-email-log.ts',
      })
      this.logRepository.saveLog(log)
      return false
    }
  }
}
