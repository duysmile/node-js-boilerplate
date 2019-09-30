const monitorConfig = require('./express-status-monitor');
const pino = require('./pino-logger');
const ssl = require('./ssl');
const jwt = require('./jwt');
const dbSettings = require('./mongo');
const cors = require('./cors');

module.exports = {
    dbSettings,
    serverSettings: {
        jwt,
        ssl,
        cors,
        port: process.env.PORT,
        logging: pino,
        monitor: monitorConfig,
    }
};
