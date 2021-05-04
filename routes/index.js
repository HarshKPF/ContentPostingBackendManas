const express = require('express');
const apiRouter = require('./api/v1');
const router = express.Router();

router.use('/api/v1', apiRouter);

module.exports = router;