//Checking the crypto module
const crypto = require('crypto');

session.input.readAsJSON(function (error, json) {
  if (error) {
    // handle error
    session.output.write("input was not JSON");
  }
  else {
    let key = "crypto-api-v1-sharedkey";
    let iv = json.iv;
    let encryptedData = json.encryptedData;
    console.error(iv);
    let decipher = crypto.createDecipheriv('aes256-cbc', key, Buffer.from(iv, 'hex'));
    decipher.update(Buffer.from(encryptedData, 'hex'));
    let decipherData = decipher.final();
    session.output.write(decipherData);
  }
});
