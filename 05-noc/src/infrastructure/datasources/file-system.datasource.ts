import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'

import { LogDataSource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

interface LogPaths {
  all: string
  medium: string
  high: string
}

export class FileSystemDatasource implements LogDataSource {
  private readonly logPaths: LogPaths

  constructor(public basePath: string = 'logs') {
    this.logPaths = {
      all: path.join(basePath, 'logs-all.log'),
      medium: path.join(basePath, 'logs-medium.log'),
      high: path.join(basePath, 'logs-high.log'),
    }

    this.initializeLogFiles()
  }

  private initializeLogFiles = (): void => {
    if (!existsSync(this.basePath)) {
      mkdirSync(this.basePath)
    }

    Object.values(this.logPaths).forEach((filePath) => {
      if (!existsSync(filePath)) {
        writeFileSync(filePath, '')
      }
    })
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`

    appendFileSync(this.logPaths.all, logAsJson)

    if (newLog.level === LogSeverityLevel.low) return

    if (newLog.level === LogSeverityLevel.medium) {
      appendFileSync(this.logPaths.medium, logAsJson)
    } else {
      appendFileSync(this.logPaths.high, logAsJson)
    }
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = readFileSync(path, 'utf-8')
    const logs = content.split('\n').map((log) => LogEntity.fromJson(log))

    return logs
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.logPaths.all)
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.logPaths.medium)
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.logPaths.high)

      default:
        throw new Error(`${severityLevel} not implemented`)
    }
  }
}
