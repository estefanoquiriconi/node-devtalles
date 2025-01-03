import { LogSeverityLevel } from '../domain/entities/log.entity'
import { CheckService } from '../domain/use-cases/checks/check-service'
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs'
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource'
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl'
import { CronService } from './cron/cron-service'
import { EmailService } from './email/email.service'

const logRespository = new LogRepositoryImpl(
  new FileSystemDatasource()
  // new MongoLogDatasource()
)

const emailService = new EmailService()

export class Server {
  public static async start() {
    console.log('Server started...')

    // //todo: Mandar email
    // new SendEmailLogs(emailService, fileSystemLogRespository).execute([
    //   'estefanoquiriconi@outlook.com.ar',
    // ])
    // emailService.sendEmailWithFileSystemLogs([
    //   'estefanoquiriconi@gmail.com',
    //   'estefanoquiriconi@outlook.com.ar',
    // ])

    const logs = await logRespository.getLogs(LogSeverityLevel.low)
    console.log(logs)

    // const url = 'http://123asdasd.com'
    // CronService.createJob('*/5 * * * * * ', () => {
    //   new CheckService(
    //     logRespository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.error(error)
    //   ).execute(url)
    // })
  }
}
