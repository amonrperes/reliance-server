require('dotenv/config');
const configDefaults = process.env;

const connection = require('../../../database/connection');

const CryptographyEngine = require('../../../utils/CryptographyEngine');
const EntitiesValidation = require('../../../utils/EntitiesValidation');
const Logging = require('../../../utils/Logging');

const logging = new Logging;
const cryptographyEngine = new CryptographyEngine;
const entitiesValidation = new EntitiesValidation;

module.exports = {
    async createMember(request, response){
        logging.middlewareLog('createMember');
    
        const {
          name,
          age,
          monthly_income,
          family_members,
          marital_status
        } = request.body;
        const id = cryptographyEngine.generateMemberId(parseInt(configDefaults.DEFAULT_USER_ID_LENGTH));
        const is_activated = 0;
        const updated = String(new Date());

        // if(!entitiesValidation.validateMaritalStatus(marital_status)){
        //   return response.status(400).json({
        //     status: 'Bad Request',
        //     message: 'Invalid Marital Status'
        //   });
        // }

        try{
          logging.databaseOperationLog('creating', 'rl_members');

          await connection('rl_members').insert({
            id,
            name,
            age,
            monthly_income,
            family_members,
            marital_status,
            is_activated,
            updated
          });

          logging.httpRequestStatus('createUser', 201);
          return response.status(201).json({
            status: 'ok',
            updated: updated,
            leader:{
              id: id,
              name: name,
              age: age,
              monthly_income: monthly_income,
              family_members: family_members,
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
    async listMembers(request, response){
        logging.middlewareLog('listMembers');
        try{
            const members = await connection('rl_members').select('*');

            return response.status(201).json({
                status: 'ok',
                members: members
            });
        } catch(err){
            return response.status(501).json({
              status:'error',
              message:`${err} - Something unexpected happened.`
            });
        }
    }
}