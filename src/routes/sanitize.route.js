const express  = require('express');
const { sanitizeJsonSchema } = require('../controllers/sanitize.controller');

const router = express.Router();

router.get('/sanitize', sanitizeJsonSchema);

module.exports = router;
