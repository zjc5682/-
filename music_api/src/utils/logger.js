const fs = require('fs');
const path = require('path');
const config = require('../config');

class Logger {
  constructor() {
    this.logDir = path.dirname(config.logger.filename);
    this.logFile = config.logger.filename;
    this.level = config.logger.level;
    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3
    };
  }

  ensureLogDir() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const metaStr = Object.keys(meta).length > 0 ? JSON.stringify(meta) : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message} ${metaStr}\n`;
  }

  write(level, message, meta = {}) {
    if (this.levels[level] <= this.levels[this.level]) {
      const logMessage = this.formatMessage(level, message, meta);
      this.ensureLogDir();
      fs.appendFileSync(this.logFile, logMessage);

      if (config.server.env === 'development') {
        console.log(logMessage.trim());
      }
    }
  }

  error(message, meta) {
    this.write('error', message, meta);
  }

  warn(message, meta) {
    this.write('warn', message, meta);
  }

  info(message, meta) {
    this.write('info', message, meta);
  }

  debug(message, meta) {
    this.write('debug', message, meta);
  }
}

module.exports = new Logger();
