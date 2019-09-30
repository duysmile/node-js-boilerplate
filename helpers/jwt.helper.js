// import key
const jwt = require('jsonwebtoken');
const {
	serverSettings: {
		jwt: {
			privateKey,
			publicKey,
			expiresIn,
			algorithm,
		},
	},
} = require('../configs');

// sign key
exports.generateToken = (data, options = {}) => {
	options = {
		algorithm,
		expiresIn, ...options
	};
	const token = jwt.sign(data, privateKey, options);
	return token;
};

// verify key
exports.verifyToken = (token, options = {}) => {
	const verifiedData = jwt.verify(token, publicKey, options);
	return verifiedData;
};
