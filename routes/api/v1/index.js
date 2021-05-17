var express = require('express');
const userRouter = require('./users');
const postRouter = require('./post');
const router = express.Router();

router.use('/', userRouter);
router.use('/', postRouter);

module.exports = router;
