//Checking the crypto module
const crypto = require('crypto');

session.input.readAsBuffer(function (error, buffer) {
  if (error) {
    // handle error
    session.output.write(error.errorMessage);
  }
  else {
    let key = "crypto-api-v1-sharedkey";
    let iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv('aes256-cbc', key, iv);
    let str = buffer.toString('utf8');
    cipher.update(str);
    let encipherData = cipher.final()
    let encryptedjson = { iv: iv.toString('hex'), encryptedData: encipherData.toString('hex') };
    session.output.write(encryptedjson);
  }
});

