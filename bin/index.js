require('dotenv').config();

const { dbSettings, serverSettings } = require('../configs');
const models = require('../models');
const server = require('./server');

let connectionDB;

const cleanup = (app) => () => {
	app.close(() => {
		console.log('Closed out remaining connections.');
		models.mongoose.connection.close();
		process.exit(1);
	});
};

process.on('uncaughtException', (err) => {
	console.error('Unhandled Exception', err);
});

process.on('uncaughtRejection', (err) => {
	console.error('Unhandled Rejection', err);
});

models.connectDB(dbSettings)
	.then((connection) => {
		console.log('DB connected!');
		connectionDB = connection;
		return server.start(serverSettings);
	})
	.then((app) => {
		console.log(`Server started succesfully, running on port: ${serverSettings.port}.`);
		app.on('close', () => {
			console.log('Server stopped.');
			connectionDB.disconnect();
		});

		process.on('SIGINT', cleanup(app));
		process.on('SIGTERM', cleanup(app));
	})
	.catch((e) => {
		console.error(e);
		process.exit(1);
	});
