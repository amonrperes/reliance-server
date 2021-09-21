const crypto = require('crypto');
const Logging = require('./Logging');

const logging = new Logging;

class CryptographyEngine{
    generateUserId(length){
        logging.generalOperation('generateUserId');
        const userIdPrefix = 'user_';
        const userId = `${userIdPrefix}${crypto.randomBytes(length).toString('hex')}`;
        return userId;
    }
    generateActivationToken(length){
        logging.generalOperation('generateActivationToken');
        const token = crypto.randomBytes(length).toString('hex');
        return token;
    }
}

module.exports = CryptographyEngine;