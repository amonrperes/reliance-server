class Logging{
  executionLog(func){
    const date = new Date();

    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const currentTime = `${hour}:${minutes}:${seconds}`;

    const log = `${currentTime} -> Executing '${func}' function.`
    console.log(log);
  }
}

module.exports = Logging;