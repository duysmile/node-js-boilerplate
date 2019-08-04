const mongoose = require('mongoose');
const { loadModulesInDir } = require('../helpers/load-modules');

module.exports = {
    mongoose,
    connectDB: function() {
        return mongoose.connect('mongodb://localhost:27017/node03', { 
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    },
    loadModels: function() {
        loadModulesInDir('models');
    }
};