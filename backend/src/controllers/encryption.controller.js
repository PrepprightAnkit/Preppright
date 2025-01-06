const encryptionUtils = require('../utils/encrypt');

const getEncryptionKey = (req, res) => {
  res.json({ key: process.env.ENCRYPTION_KEY });
};

module.exports = { getEncryptionKey };