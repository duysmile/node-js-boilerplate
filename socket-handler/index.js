const { initialize } = require('./initialize-socket');
const jwtHelper = require('../helpers/jwt.helper');

function authenticationUser(socket, next) {
	try {
		const { token } = socket.handshake.query;
		if (!token) {
			return next(new Error('INVALID_TOKEN'));
		}
		const verifiedData = jwtHelper.verifyToken(token);
		socket.user = verifiedData;
		return next();
	} catch (error) {
		console.error(error);
		return next(error);
	}
}

exports.load = (io) => {
	io.use(authenticationUser);

	initialize(io);
};
