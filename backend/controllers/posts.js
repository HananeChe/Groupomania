const PostsList = require('../models/posts');

//const ObjectId = require('mongoose').Types.ObjectId;


exports.createPost = (req, res, next) => {
const postObject = JSON.parse(req.body.post);
    console.log(postObject);
    delete postObject.userId;
    const post = new PostsList({
        ...postObject,
        userId: req.auth.userId,
        userName: req.body.userName,
        post: req.body.post,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        comments: [""],
        likes : 0,
        dislikes: 0,
        usersLiked: [""],
        usersDisliked: [""]
    });
    console.log(post);


    post.save()
    .then(() => { res.status(201).json({message: 'Post enregistré !'})})
    .catch(error => { res.status(400).json( { error });})
}; 



exports.modifyPost = (req, res, next) => {
    
};

exports.deletePost = (req, res, next) => {
    
};

exports.likePost = (req, res, next) => {

};

exports.getOnePost = (req, res, next) => {

};

exports.getAllPost = (req, res, next) => {
    PostsList.find((err, docs) => {
        if(!error) res.send(docs);
        else console.log('Error' + err);
    })
    /*    PostsModel.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({error}))*/ 
}
