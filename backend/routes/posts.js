const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const postsCtrl = require('../controllers/posts');

router.post('/', auth, multer, postsCtrl.createPost);
router.post('/comments', multer, postsCtrl.createComment);
router.delete('/:id', auth, postsCtrl.deletePost);
router.put('/:id', auth, multer, postsCtrl.modifyPost);
router.post('/:id/like', auth, postsCtrl.likePost);
router.get('/:id', auth, postsCtrl.getOnePost);
router.get('/', postsCtrl.getAllPost);


module.exports = router;