import winston from 'winston';
import { Logger } from './logger.interface';

export class WinstonLogger implements Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new winston.transports.File({
          filename: 'logs/combined.log',
        }),
      ],
    });
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        })
      );
    }
  }
  info(message: string, meta?: Record<string, unknown>): void {
    this.logger.info(message, meta);
  }
  error(message: string, meta?: Record<string, unknown>): void {
    this.logger.error(message, meta);
  }
  warn(message: string, meta?: Record<string, unknown>): void {
    this.logger.warn(message, meta);
  }
  debug(message: string, meta?: Record<string, unknown>): void {
    this.logger.debug(message, meta);
  }
}
