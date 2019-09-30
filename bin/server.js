const appExpress = require('../app');
const spdy = require('spdy');
const socketio = require('socket.io');

exports.start = (serverSettings) => {
    return new Promise((resolve, reject) => {
        const app = appExpress(serverSettings);
        const server = spdy.createServer(serverSettings.ssl, app);
        const io = socketio(server);
        const socketHandler = require('../socket-handler');
        socketHandler.load(io);
    
        const port = serverSettings.port;
        server.listen(port, () => resolve(server));
    });
};
