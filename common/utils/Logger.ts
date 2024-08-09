import { createLogger, format, transports } from 'winston';
import * as fs from 'fs';
import * as path from 'path';

class Logger {
  private static instance: Logger;
  private logger: ReturnType<typeof createLogger>;

  private constructor() {
    const logDir = 'logs';
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const myFormat = format.printf(({ level, message, timestamp }) => {
      return `${timestamp} - ${level.toUpperCase()} ${message}`;
    });

    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({
          format: 'HH:mm:ss.SSS'
        }),
        format.errors({ stack: true }),
        format.splat(),
        myFormat
      ),
      transports: [
        new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
        new transports.File({ filename: path.join(logDir, 'combined.log') }),
        new transports.Console({
          format: format.combine(
            format.colorize(),
            myFormat
          )
        })
      ]
    });
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public info(message: string | object, ...meta: any[]) {
    if (typeof message === 'object') {
      message = JSON.stringify(message, null, 2); // Pretty print the object
    }
    this.logger.info(message, ...meta);
  }

  public error(message: string | object, ...meta: any[]) {
    if (typeof message === 'object') {
      message = JSON.stringify(message, null, 2);
    }
    this.logger.error(message, ...meta);
  }

  public debug(message: string | object, ...meta: any[]) {
    if (typeof message === 'object') {
      message = JSON.stringify(message, null, 2);
    }
    this.logger.debug(message, ...meta);
  }

  public logBanner(message: string): void {
    const lines = message.split('\n');
    const maxLength = lines.reduce((max, line) => Math.max(max, line.length), 0);
    const border = '*'.repeat(maxLength + 4);

    let banner = `${border}\n`;
    lines.forEach(line => {
      const padding = ' '.repeat(maxLength - line.length);
      banner += `* ${line}${padding} *\n`;
    });
    banner += border;
    banner.split('\n').forEach(line => this.logger.info(line));
  }
}

export default Logger;
