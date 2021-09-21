const crypto = require('crypto');

class CryptographyEngine{
    createActivationToken(length){
        const token = crypto.randomBytes(length).toString('hex');
        return token;
    }
}

module.exports = CryptographyEngine;