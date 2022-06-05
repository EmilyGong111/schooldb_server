//Log library, can print different level of logs and store logs. Can use Kibana to manage logs.
const winston = require('winston');

const logger = winston.createLogger({
    level: process.env.LOGGER_LEVEL || 'info', //print different level of logs
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf(
            (info)=>`${info.timestamp} ${info.level}: ${info.message}`
        )
    ),
    transports: [new winston.transports.Console()],//Print in console. You can point the location, please read the documentation in npm 
})
module.exports = logger;

//instead winston, you can also use pino as the logger library