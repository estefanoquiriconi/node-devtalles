import nodemail from 'nodemailer'
import { EmailService, SendMailOptions } from './email.service'
import { subscribe } from 'diagnostics_channel'

describe('EmailService', () => {
  let emailService: EmailService
  const mockSendEmail = jest.fn()

  //Mock al createTransport
  nodemail.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendEmail,
  })

  beforeEach(() => {
    emailService = new EmailService()
  })

  test('should send email', async () => {
    const option: SendMailOptions = {
      to: 'estefanoquiriconi@gmail.com',
      subject: 'test',
      html: '<h1>Test</h1>',
    }

    await emailService.sendEmail(option)

    expect(mockSendEmail).toHaveBeenCalledWith({
      attachments: [],
      html: '<h1>Test</h1>',
      subject: 'test',
      to: 'estefanoquiriconi@gmail.com',
    })
  })

  test('should send email with attachments', async () => {
    await emailService.sendEmailWithFileSystemLogs(
      'estefanoquiriconi@gmail.com'
    )

    expect(mockSendEmail).toHaveBeenCalledWith({
      to: 'estefanoquiriconi@gmail.com',
      subject: 'Logs del servidor',
      html: expect.any(String),
      attachments: expect.arrayContaining([
        { filename: 'logs-all.log', path: './logs/logs-all.log' },
        { filename: 'logs-high.log', path: './logs/logs-high.log' },
        { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
      ]),
    })
  })
})
