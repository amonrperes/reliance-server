const connection = require('../../../database/connection');

const EmailSender = require('../../../utils/EmailSender');
const Logging = require('../../../utils/Logging');

const logging = new Logging;
const emailSender = new EmailSender;

module.exports = {
    async createUser(request, response){
        logging.middlewareLog('createUser');
    
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
          logging.databaseOperationLog('creating', 'leaders');
          await connection('leaders').insert({
            id,
            organization,
            name,
            calling,
            email,
            permissions,
            date
          });

          logging.generalOperation('emailSender');
          let data = {
              service: 'gmail',
              auth: {
                  user: 'amon.ribeiro.peres@gmail.com',
                  pass: 'OlaMundo2020!'
              },
              recipient: email,
              subject: 'Reliance Activation Code',
              text: '234jjgwsJH76'
          };
          emailSender.sendEmail(data);
          
          logging.httpRequestStatus('createUser', 201);
          return response.status(201).json({
            status: 'ok',
            message: 'Leader was successfully created',
            date: date,
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
}