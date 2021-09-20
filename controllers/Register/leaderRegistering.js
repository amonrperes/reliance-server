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
        message: 'Leader was successfully created',
        date: date
        leader:{
          id: id,
          name: name,
          organization: organization,
          calling: calling,
          email: email,
          permissions: permissions
        }
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
