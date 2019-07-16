const express = require('express');
const { 
    getPosts, 
    createPost, 
    postsByUser,
    postById,
    isPoster,
    updatePost,
    deletePost,
    photo,
    singlePost,
    like,
    unlike,
    comment,
    uncomment
 } = require('../contollers/post');
const { requireSignin } = require('../contollers/auth');
const { userById } = require('../contollers/user');
const { createPostValidator } = require('../validator');

const router = express.Router();

router.get('/posts',  getPosts);

//like unlike
router.put('/post/like', requireSignin, like);
router.put('/post/unlike', requireSignin, unlike);

//comments
router.put('/post/comment', requireSignin, comment);
router.put('/post/uncomment', requireSignin, uncomment);

router.post('/post/:userId', 
    requireSignin, 
    createPost,
    createPostValidator
);

router.get('/posts/:userId', requireSignin, postsByUser);
router.get('/post/:postId', singlePost);
router.put('/post/:postId', requireSignin, isPoster, updatePost);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);

//photo
router.get('/post/photo/:postId', photo);


//any route containing :userId, our app will first execute userById()
router.param('userId', userById);

//any route containing :postId, our app will first execute postById()
router.param('postId', postById);

module.exports = router;

  
