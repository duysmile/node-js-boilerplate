const BaseRepository = require('./base.repository');

// ====================================
// ============LOAD_MODELS=============
// ====================================
const User = require('../models/user');

module.exports = {
    userRepository: new BaseRepository('User'),
};