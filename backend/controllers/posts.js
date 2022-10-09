const PostsList = require('../models/posts');
const user = require('../models/user');
const fs = require('fs');

//const ObjectId = require('mongoose').Types.ObjectId;


exports.createPost = (req, res, next) => {
    console.log(req.body);
/*const postObject = JSON.parse(req.body.post);
    console.log(postObject);
    delete postObject.userId;*/
    const post = new PostsList({
        //...postObject,
        userId: user._id,      //req.auth undefined
        userName: req.body.userName,
        content: req.body.content,
        //imageUrl: `${req.protocol}://${req.get('host')}/images/${req}`,    //req.file.filename undefined
        comments: [],
        likes : 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });


    post.save()
    .then(() => { res.status(201).json({message: 'Post enregistré !'})})
    .catch(error => { res.status(400).json( { error })}, console.log("error catch post"))
}; 



exports.modifyPost = (req, res, next) => {
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete postObject._userId;
    PostsList.findOne({_id: req.params.id})
        .then((post) => {
            if (post.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                PostsList.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Post modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
   };


exports.deletePost = (req, res, next) => {
    PostsList.findOne({ _id: req.params.id})
    /*.then(post => {
        if (post.userId != req.auth.userId) {
            res.status(401).json({message: 'Not authorized'});
        } else {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {*/
                PostsList.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message: 'Post supprimé !'})})
                    .catch(error => res.status(401).json({ error }));
           /* });
        
    })
    .catch( error => {
        res.status(500).json({ error });
    });*/
};

exports.likePost = (req, res, next) => {
    let liked = req.body.like;
    let userId = req.body.userId;
    let postId = req.params.id;
    console.log(liked);
    console.log(userId);
    console.log(postId);
    if (liked === 1) {
        PostsList.updateOne({_id: postId} ,{$push: {usersLiked: userId}, $inc:{likes: +1}})
        .then(() => res.status(200).json({message : 'Like ajouté'}))
        .catch(error => res.status(401).json({ error }));
    }
    if(liked === 0) {
        PostsList.findOne({_id: postId})
        .then((post) => {
            if (post.usersLiked.includes(userId)) {
                PostsList.updateOne({_id: postId}, {$pull: {usersLiked: userId}, $inc:{likes: -1}})
                .then(() => res.status(200).json({message : 'Like annulé'}))
                .catch(error => res.status(400).json({ error }));
            }
            if (post.usersDisliked.includes(userId)) {
                PostsList.updateOne({_id: postId}, {$pull: {usersDisliked: userId}, $inc:{dislikes: -1}})
                .then(() => res.status(200).json({message : 'Disike annulé'}))
                .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(401).json({ error }));
    }
    
    if(liked === -1){
            PostsList.updateOne({_id: postId}, {$push: {usersDisliked: userId}, $inc:{dislikes: +1}})
            .then(() => res.status(200).json({message : 'Dislike ajouté'}))
            .catch(error => res.status(401).json({ error }));
        }
};

exports.getOnePost = (req, res, next) => {
    PostsList.findOne({_id: req.params.id})
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(404).json({error}));
};

exports.getAllPost = (req, res, next) => {
    PostsList.find()
    .then(posts => res.status(200).json(posts), console.log("get ok"))
    .catch(error => res.status(400).json({error}), console.log("get non ok"))
    }





    /*     PostsList.find((err, docs) => {
        if(!error) res.send(docs);
        else console.log('Error' + err);   PostsModel.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({error}))*/ 

