require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

const bodyParser = require('body-parser');

const apis = require('./apis');
const socketHandler = require('./socket-handler');

const models = require('./models');
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

app.use(cors(headers));
app.options('*', cors(headers));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));

// load static file
app.use(express.static('public'));

// load APIs
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
