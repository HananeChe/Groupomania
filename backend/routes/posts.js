const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const postsCtrl = require('../controllers/posts');

router.post('/', auth, multer, postsCtrl.createPost);
//router.delete('/:id', auth, postsCtrl.deletePost);
//.put('/:id', auth, multer, postsCtrl.modifyPost);
//router.post('/:id/like', auth, postsCtrl.likePost);
//router.get('/:id', auth, postsCtrl.getOnePost);
router.get('/', auth, postsCtrl.getAllPost);


module.exports = router;