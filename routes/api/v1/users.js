const express = require('express');
const userController = require('../../../controllers/userController');
const router = express.Router({});

router.get('/users', userController.getUsersList);
router.post('/user', userController.createNewUser);

module.exports = router;
