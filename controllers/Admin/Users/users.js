require('dotenv/config');
const configDefaults = process.env;

const connection = require('../../../database/connection');

const CryptographyEngine = require('../../../utils/CryptographyEngine');
const EmailSender = require('../../../utils/EmailSender');
const Logging = require('../../../utils/Logging');

const logging = new Logging;
const emailSender = new EmailSender;
const cryptographyEngine = new CryptographyEngine;

module.exports = {
    async createUser(request, response){
        logging.middlewareLog('createUser');
    
        const {
          organization,
          name,
          calling,
          email,
          permission
        } = request.body;
        const id = cryptographyEngine.generateUserId(5);
        const is_activated = 0;
        const updated = String(new Date());

        const activation_token = cryptographyEngine.generateActivationToken(10);
    
        try{
          logging.databaseOperationLog('creating', 'rl_users');
          await connection('rl_users').insert({
            id,
            name,
            email,
            organization,
            calling,
            permission,
            activation_token,
            is_activated,
            updated
          });

          const auth = {
            user: configDefaults.RELIANCE_EMAIL,
            pass: configDefaults.REALIANCE_PASSWORD
          }
          
          emailSender.sendEmail(configDefaults.EMAIL_SERVICE, auth, email, activation_token);
          
          logging.httpRequestStatus('createUser', 201);
          return response.status(201).json({
            status: 'ok',
            updated: updated,
            leader:{
              id: id,
              name: name,
              organization: organization,
              calling: calling,
              email: email,
              permission: permission,
              activation_token: activation_token,
              is_activated: is_activated,
            }
          });
        } catch(err){
          console.log(err);
        }
    },
    async activateUser(request, response){
        logging.middlewareLog('activateUser');
        const { activation_token } = request.body;
        const isActivated = 1;

        try{
            await connection('rl_users').update({
                is_activated: isActivated
            }).where('activation_token', '=', activation_token);

            return response.status(201).json({
                status: 'ok',
                message: 'User activated.'
            });
        } catch(err){
            console.log(err);
        }
    }
}