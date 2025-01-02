import nodemailder from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'

interface SendMailOptions {
  to: string | string[]
  subject: string
  html: string
  attachments: Attachement[]
}

interface Attachement {
  filename: string
  path: string
}

const { MAILER_SERVICE, MAILER_EMAIL, MAILER_SECRET_KEY } = envs

export class EmailService {
  constructor() {}

  private transporter = nodemailder.createTransport({
    service: MAILER_SERVICE,
    auth: {
      user: MAILER_EMAIL,
      pass: MAILER_SECRET_KEY,
    },
  })

  async sendEmail(options: SendMailOptions): Promise<Boolean> {
    const { to, subject, html, attachments = [] } = options

    try {
      const sendInformation = await this.transporter.sendMail({
        to,
        subject,
        html,
        attachments,
      })

      console.log(sendInformation)
      return true
    } catch (error) {
      return false
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'Logs del servidor'
    const html = `
      <h1>Registro del Servidor</h1>
      <p>Este es un mensaje de registro del servidor. Por favor, revise los detalles a continuación:</p>
      <ul>
        <li>Fecha: ${new Date().toLocaleString()}</li>
        <li>Estado: Activo</li>
        <li>Detalles: No se han encontrado errores.</li>
      </ul>
    `

    const attachments: Attachement[] = [
      { filename: 'logs-all.log', path: './logs/logs-all.log' },
      { filename: 'logs-high.log', path: './logs/logs-high.log' },
      { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
    ]

    this.sendEmail({
      to,
      subject,
      html,
      attachments,
    })
  }
}
