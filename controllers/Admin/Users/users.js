require('dotenv/config');
const configDefaults = process.env;

const connection = require('../../../database/connection');

const CryptographyEngine = require('../../../utils/CryptographyEngine');
const EmailSender = require('../../../utils/EmailSender');
const EntitiesValidation = require('../../../utils/EntitiesValidation');
const Logging = require('../../../utils/Logging');

const logging = new Logging;
const emailSender = new EmailSender;
const cryptographyEngine = new CryptographyEngine;
const entitiesValidation = new EntitiesValidation;

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

        if(!entitiesValidation.validateUser(request.body)){
          return response.status(400).json({
            status: 'Bad request',
            message: `Data type was not correct.`
          })
        }

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
          return response.status(501).json({
            status:'error',
            message:`${err} - Something unexpected happened.`
          });
        }
    },
    async listUsers(request, response){
        logging.middlewareLog('listUsers');
        try{
            const users = await connection('rl_users').select('*');

            return response.status(201).json({
                status: 'ok',
                users: users
            });
        } catch(err){
            return response.status(501).json({
              status:'error',
              message:`${err} - Something unexpected happened.`
            });
        }
    }
}