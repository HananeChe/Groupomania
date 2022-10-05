/*const PostsList = require('../models/posts');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    console.log(postObject);
    delete postObject.userId;
    const post = new PostsList({
        ...postObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes : 0,
        dislikes: 0,
        usersLiked: [""],
        usersDisliked: [""]
    });
    console.log(post);


    post.save()
    .then(() => { res.status(201).json({message: 'Post enregistrée !'})})
    .catch(error => { res.status(400).json( { error });})
}; */

exports.getPost = (req, res, next) => {

}

exports.modifyPost = (req, res, next) => {
    
}

exports.deetePost = (req, res, next) => {
    
}