class Logging{
  executionLog(func){
    const date = new Date();

    const log = `${date} -> Executing '${func}' function.`
    console.log(log);
  }
}

module.exports = Logging;
