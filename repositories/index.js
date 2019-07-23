const BaseRepository = require('./base.repository');

// ====================================
// ============LOAD_MODELS=============
// ====================================
const { loadModels } = require('../models');
loadModels();

module.exports = {
    userRepository: new BaseRepository('User'),
};
