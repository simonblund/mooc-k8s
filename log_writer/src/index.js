const fs = require('fs');

const randomString = crypto.randomUUID();
console.log("started the log writer")
setInterval(() => {
    const log_string = new Date().toISOString() + " : " + randomString;
    console.log("writing: "+log_string)
    fs.appendFileSync('./data/log.txt', log_string + '\n');

}, 5000);