import { LogEntity, LogSeverityLevel } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>
}

type SuccessCallback = (() => void) | undefined
type ErrorCallback = ((error: string) => void) | undefined

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRepositories: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callLogs(log: LogEntity) {
    this.logRepositories.forEach((logRepository) => {
      logRepository.saveLog(log)
    })
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url)
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`)
      }
      const log = new LogEntity({
        message: `Service ${url} working`,
        level: LogSeverityLevel.low,
        origin: 'checkservice-ts',
      })
      this.callLogs(log)

      this.successCallback?.()
      return true
    } catch (error) {
      const errorMessage = `Service ${url} is not working. ${error}`
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: 'check-service.ts',
      })
      this.callLogs(log)
      this.errorCallback?.(errorMessage)
      return false
    }
  }
}
