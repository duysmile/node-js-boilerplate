const spdy = require('spdy');
const socketio = require('socket.io');
const appExpress = require('../app');

exports.start = (serverSettings) => new Promise((resolve) => {
	const app = appExpress(serverSettings);
	const server = spdy.createServer(serverSettings.ssl, app);
	const io = socketio(server);
	const socketHandler = require('../socket-handler');
	socketHandler.load(io);

	const { port } = serverSettings;
	server.listen(port, () => resolve(server));
});
