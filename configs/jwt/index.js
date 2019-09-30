const fs = require('fs');
const path = require('path');

module.exports = {
    privateKey: fs.readFileSync(path.resolve(__dirname, './private.key')),
    publicKey: fs.readFileSync(path.resolve(__dirname, './public.key')),
    algorithm: 'RS256',
    expiresIn: 60 * 60 * 24 // 1 day
};
