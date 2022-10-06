const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const postsCtrl = require('../controllers/posts');

router.post('/', multer, postsCtrl.createPost);
router.delete('/:id', postsCtrl.deletePost);
router.put('/:id', multer, postsCtrl.modifyPost);
router.post('/:id/like', postsCtrl.likePost);
router.get('/:id', postsCtrl.getOnePost);
router.get('/', postsCtrl.getAllPost);


module.exports = router;