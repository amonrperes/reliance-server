const connection = require('../../database/connection');
const log = require('../../utils/Logging');

const logging = new log();

module.exports={
  async createLeader(request, response){
    logging.executionLog('createLeader');

    const {
      id,
      organization,
      name,
      calling,
      email,
      permissions,
      date
    } = request.body;

    try{
      await connection('leaders').insert({
        id,
        organization,
        name,
        calling,
        email,
        permissions,
        date
      });

      return response.status(201).json({
        status: 'ok',
        leader_id: id,
        message: 'Leader was successfully created'
      });
    } catch(err){
      console.log(err);
    }
  },

  async listAllLeaders(request, response){
    logging.executionLog('createLeader');
    const leaders = await connection('leaders').select('*');
    return response.status(201).json(leaders);
  }
}
