const express = require('express');
const postController = require('../../../controllers/postController');
const router = express.Router({});

router.post('/post/facebook', postController.createFacebookPost);
router.get('/post/facebook/:post_id', postController.getFacebookPostData);
router.put('/post/facebook', postController.updateFacebookPost);
router.delete('/post/facebook/:post_id', postController.deleteFacebookPost);

module.exports = router;