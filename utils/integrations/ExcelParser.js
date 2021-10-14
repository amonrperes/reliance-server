const {spawn} = require('child_process');
const pythonExcelParser = '../external_scripts/test.py'

function ExcelParser(params){
  let dataToSend;

  const parser = spawn('python', [pythonExcelParser, params]);

  parser.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
  });

  parser.on('close', (statusCode) => {
    console.log(`child process close all stdio with code ${statusCode}`)
  });

  return parser;
} 

module.exports = {ExcelParser};