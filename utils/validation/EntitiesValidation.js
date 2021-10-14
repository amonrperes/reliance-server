const Logging = require("../log/Logging");

const logging = new Logging;

const MARITAL_STATUS = [
    'single',
    'married',
    'divorced',
    'widowed'
];
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

    validateMaritalStatus(status){
        MARITAL_STATUS.forEach(element => {
            if(status == element) return true;
        });
        return false;
    }
}

module.exports = EntitiesValidation;