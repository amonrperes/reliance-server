require('dotenv/config');
const configDefaults = process.env;
class Logging{
  middlewareLog(func){
    const date = new Date();

    const log = `${date} - Executing '${func}' function.`
    console.log(log);
  }

  databaseOperationLog(func, table, database){
    if(!database) database = configDefaults.DEFAULT_DATABASE;
    const date = new Date();

    const log = `${date} - ${func} on ${table} table at ${database}`;
    console.log(log);
  }

  httpRequestStatus(func, status){
    const date = new Date();

    const log = `${date}/${func} -> ${status}`;
    console.log(log);
  }

  generalOperation(func){
    const date = new Date();

    const log = `${date} - Executing '${func}'.`;
    console.log(log);
  }
}

module.exports = Logging;
