const express = require('express');
const router = express.Router();
const { getEncryptionKey } = require('../controllers/encryption.controller');
const { verifyJWT } = require('../middlewares/auth.middleware');

router.get('/encryption-key', verifyJWT, getEncryptionKey);

module.exports = router;