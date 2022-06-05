const mongoose = require('mongoose');
const logger = require('./logger');

function connectToDB () {
    const connectionString = process.env.CONNECTION_STRING;
    if(!connectionString){
        logger.error('connection string not defined');
        process.exit(1);
    }
    const db = mongoose.connection;
    db.on('connected', () => {
        logger.info(`DB connected, ${connectionString}`)
    })

    db.on('error', (error) => {
        logger.error(error.message);
        process.exit(2);
    })

    db.on('disconnected', () => {
        logger.info('db connection lost')
    })
    return mongoose.connect(connectionString);
}

module.exports = connectToDB