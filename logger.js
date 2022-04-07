const { createLogger, transports, format, log } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.File({
            filename: 'error.log',
            level: 'error',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({
            filename: 'info.log',
            level: "info",
            format: format.combine(format.timestamp(), format.json())
        }),
    ]
});

module.exports = logger;