const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const SECRET_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('base64'); // Store in env
const IV_LENGTH = 12;

const encryptionUtils = {
  encrypt(data) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY, 'base64'), iv);
    
    let encryptedData = cipher.update(JSON.stringify(data), 'utf8', 'base64');
    encryptedData += cipher.final('base64');
    
    const authTag = cipher.getAuthTag();
    
    return {
      encryptedData,
      iv: iv.toString('base64'),
      authTag: authTag.toString('base64')
    };
  },

  decrypt(encryptedObj) {
    const decipher = crypto.createDecipheriv(
      ALGORITHM, 
      Buffer.from(SECRET_KEY, 'base64'),
      Buffer.from(encryptedObj.iv, 'base64')
    );
    
    decipher.setAuthTag(Buffer.from(encryptedObj.authTag, 'base64'));
    
    let decrypted = decipher.update(encryptedObj.encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    
    return JSON.parse(decrypted);
  }
};

module.exports = encryptionUtils;