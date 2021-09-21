const connection = require('../../../database/connection');

const CryptographyEngine = require('../../../utils/CryptographyEngine');
const EmailSender = require('../../../utils/EmailSender');
const Logging = require('../../../utils/Logging');

const DEFAULT_ACTIVATION_LENGTH = 10;

const logging = new Logging;
const emailSender = new EmailSender;
const cryptographyEngine = new CryptographyEngine;

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

        const is_activated = 0;

        logging.generalOperation('createActivationToken');
        const activation_token = cryptographyEngine.createActivationToken(DEFAULT_ACTIVATION_LENGTH);
    
        try{
          logging.databaseOperationLog('creating', 'leaders');
          await connection('leaders').insert({
            id,
            organization,
            name,
            calling,
            email,
            permissions,
            activation_token,
            is_activated,
            date
          });

          logging.generalOperation('emailSender');
          const auth = {
            user: 'amon.ribeiro.peres@gmail.com',
            pass: 'OlaMundo2020!'
          }
          
          emailSender.sendEmail('smtp.gmail.com', auth, email, 'Reliance Activation Code', activation_token);
          
          logging.httpRequestStatus('createUser', 201);
          return response.status(201).json({
            status: 'ok',
            date: date,
            leader:{
              id: id,
              name: name,
              organization: organization,
              calling: calling,
              email: email,
              permissions: permissions,
              activation_token: activation_token,
              is_activated: is_activated,
              date: date
            }
          });
        } catch(err){
          console.log(err);
        }
    },
    async activateUser(request, response){
        logging.middlewareLog('activateUser');
        const { activationToken } = request.body;
        const isActivated = 1;

        try{
            await connection('leaders').update({
                is_activated: isActivated
            }).where('activation_token', '=', activationToken);

            return response.status(201).json({
                status: 'ok',
                message: 'User activated.'
            });
        } catch(err){
            console.log(err);
        }
    }
}