import { PrismaClient, SeverityLevel } from '@prisma/client'
import { LogDataSource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

const prisma = new PrismaClient()

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
}

export class PostgresLogDatasource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level]
    await prisma.logModel.create({
      data: {
        message: log.message,
        level,
        origin: log.origin,
      },
    })
    console.log('Postgres log created')
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel]

    const dbLogs = await prisma.logModel.findMany({
      where: {
        level,
      },
    })

    return dbLogs.map(LogEntity.fromObject)
  }
}
