import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs'
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl'
import { EmailService } from './email/email.service'

const fileSystemLogRespository = new LogRepositoryImpl(
  new FileSystemDatasource()
)
const emailService = new EmailService()

export class Server {
  public static start() {
    console.log('Server started...')

    // //todo: Mandar email
    // new SendEmailLogs(emailService, fileSystemLogRespository).execute([
    //   'estefanoquiriconi@outlook.com.ar',
    // ])
    // emailService.sendEmailWithFileSystemLogs([
    //   'estefanoquiriconi@gmail.com',
    //   'estefanoquiriconi@outlook.com.ar',
    // ])

    // const url = 'http://google.com'
    // CronService.createJob('*/5 * * * * * ', () => {
    //   new CheckService(
    //     fileSystemLogRespository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.error(error)
    //   ).execute(url)
    //   // new CheckService().execute('http://localhost:3000')
    // })
  }
}
