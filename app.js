const express = require('express');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const expressStatusMonitor = require('express-status-monitor');
const pino = require('pino');
const morgan = require('morgan');
const helmet = require('helmet');

const apis = require('./apis');
const authBasic = require('./middlewares/basic-auth.middleware');
const errorHanlder = require('./helpers/error-handler');

module.exports = (settings) => {
    const statusMonitor = expressStatusMonitor(settings.monitor);
    const configedPino = pino(settings.logging.options, settings.logging.destination);
    const logger = require('express-pino-logger')({ logger: configedPino });
    const corsHeaders = settings.cors;

    const app = express();

    app.use(helmet());
    app.use(morgan('dev'));
    app.use(compression());
    app.use(statusMonitor);
    app.use(logger);
    app.use(cors(corsHeaders));
    app.options('*', cors(corsHeaders));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json({ type: 'application/json' }));

    // load static file
    app.use(express.static('public'));

    // load APIs
    app.get('/status', authBasic, statusMonitor.pageRoute);
    apis.load(app);

    // Error handling
    app.use(errorHanlder(configedPino));

    return app;
};
