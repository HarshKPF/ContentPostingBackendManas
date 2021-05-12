var express = require('express');
const postRouter = require('./posts');
const router = express.Router();

router.use('/', postRouter);

module.exports = router;
