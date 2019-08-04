require('dotenv').config();
const config = require('./configs');

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const statusMonitor = require('express-status-monitor')(config.monitorConfig);
const pino = require('pino')(config.pino.options, config.pino.destination);
const logger = require('express-pino-logger')({
    logger: pino
});

const apis = require('./apis');
const socketHandler = require('./socket-handler');
const models = require('./models');
const authBasic = require('./middlewares/basic-auth.middleware');

const port = process.env.PORT || 3001;

models.connectDB()
    .then(console.log('DB connected!'))
    .catch(e => {
        console.error(e);
        return process.exit(1);
    });

const headers = {
    // 'allowedHeaders': ['Content-Type', 'Authorization'],
    'origin': '*',
    // 'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // 'preflightContinue': true
};

app.use(compression());
app.use(statusMonitor);
app.use(logger);
app.use(cors(headers));
app.options('*', cors(headers));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));

// load static file
app.use(express.static('public'));

// load APIs
app.get('/status', authBasic, statusMonitor.pageRoute);
apis.load(app);

// Error handling
app.use(function (err, req, res, next) {
    // console.error(JSON.stringify(err, null, 2));
    console.error(err);
    
    if (Array.isArray(err.errors)) {
        const messages = err.errors.map(function(item) {
            return item.messages;
        });
        return res.status(400).json({
            errors: messages
        });
    }
    return res.status(400).json({
        message: err.message
    });
});

socketHandler.load(io);

server.listen(port, () => console.log(`Example app listening on port ${port}!`));
