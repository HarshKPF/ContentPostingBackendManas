const express = require('express');
const postController = require('../../../controllers/postController');
const router = express.Router({});

// Facebook Post Management
router.post('/post/facebook', postController.createFacebookPost);
router.get('/post/facebook/:post_id', postController.getFacebookPostData);
router.put('/post/facebook', postController.updateFacebookPost);
router.delete('/post/facebook/:post_id', postController.deleteFacebookPost);

// LInkedIn Post Management
router.post('/post/linkedin', postController.createLinkedinPost);
router.get('/post/linkedin', postController.getLinkedinAllPostData);
router.get('/post/linkedin/:post_id', postController.getLinkedinPostData);

module.exports = router;