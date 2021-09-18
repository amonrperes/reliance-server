
// import { ORGANIZATIONS } from '../../ConfigDefaults';
const configDefaults = require('../../ConfigDefaults');

const Log = require('../../utils/Logging');

const logging = new Log();
const ConfigDefaults = new configDefaults();

module.exports = {
  checkServerAvaibility(require, response){
    const FUNCTION_NAME = 'checkServerAvaibility';
    logging.executionLog(FUNCTION_NAME);
    return response.status(201).json({
      server_status: "online"
    })
  },
  getOrganizations(require, response){
    return response.status(201).json({
      organizations: ConfigDefaults.getOrganizations()
    });
  }
}