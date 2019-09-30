require('dotenv').config();

const { dbSettings, serverSettings } = require('../configs');
const models = require('../models');
const server = require('./server');
let connectionDB;

models.connectDB(dbSettings)
    .then(connection => {
        console.log('DB connected!');
        connectionDB = connection;
        return server.start(serverSettings);
    })
    .then(app => {
        console.log(`Server started succesfully, running on port: ${serverSettings.port}.`)
        app.on('close', () => {
            console.log('Server stopped.');
            connectionDB.disconnect();
        });
    })
    .catch(e => {
        console.error(e);
        logger.error(e);
        process.exit(1);
    });
    