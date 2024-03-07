const crypto = require('crypto');

function tokenHash(token) {
    return crypto.createHash('sha512').update(token).digest('hex');
}

module.exports = { tokenHash };
