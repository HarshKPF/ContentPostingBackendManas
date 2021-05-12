const express = require('express');
const postController = require('../../../controllers/postController');
const router = express.Router({});

router.post('/post', postController.createNewPost); //For creating the actual post.
router.get('/links/:post_id', postController.getPostLinks); //For displaying the links to the posts. This loads after the  post is created.

module.exports = router;
