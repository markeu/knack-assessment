const express = require('express');
const sanitizeRoute = require('./sanitize.route');

const router = express.Router();

router.use('/v1', sanitizeRoute);

module.exports = router;