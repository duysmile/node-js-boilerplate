const mongoose = require('mongoose');

const { loadModulesInDir } = require('../helpers/load-modules');

module.exports = {
	mongoose,
	connectDB: (dbSettings) => mongoose.connect(dbSettings.connection, dbSettings.options),
	loadModels: () => {
		loadModulesInDir('models');
	},
};
