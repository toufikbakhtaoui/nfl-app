const { createLogger, format, transports } = require('winston')
const fs = require('fs')
const path = require('path')
const env = process.env.NODE_ENV || 'dev'
const logDir = 'logs'

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}
const filename = path.join(logDir, 'results.log')

const logger = createLogger({
    level: env === 'dev' ? 'debug' : 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(
                    (info) => `${info.timestamp} ${info.level}: ${info.message}`
                )
            ),
        }),
        new transports.File({ filename }),
    ],
})

module.exports = logger
