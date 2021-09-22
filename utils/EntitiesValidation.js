const Logging = require("./Logging");

const logging = new Logging;

class EntitiesValidation{
    validateUser(data){
        Object.values(data).forEach(value => {
            if (typeof value !== 'string'){
                logging.logErr(data[value], 'must be a string');
                return false;
            }
        })
        return true;
    }
}

module.exports = EntitiesValidation;