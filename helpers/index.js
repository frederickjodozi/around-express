const fs = require('fs');

const readFile = path => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    }
    else {
      const parsedData = JSON.parse(data);
      resolve(parsedData);
    }
  });
});

module.exports = readFile;
