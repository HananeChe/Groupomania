const PostsList = require('../models/posts');
const userSchema = require('../models/user');
const fs = require('fs');

//const ObjectId = require('mongoose').Types.ObjectId;

exports.createPost = (req, res, next) => {
    const postObject = req.body
    const post = new PostsList({
        ...postObject,
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
    })

    post.save()
    .then(() => { res.status(201).json({message: 'Post enregistré !'})})
    .catch(error => { res.status(400).json( { error })}, console.log("error catch post"))
}; 

exports.createComment = (req, res, next) => {
    
    console.log(req.body);
    PostsList.findOne({_id: req.params.id})
    .then((post) => { 
        const newComment = {content: req.body.content, userName: req.body.userName, userId: req.body.userId};
        post.comments.push(newComment)
        PostsList.updateOne({_id: req.params.id} ,{$push: {comments: newComment}})
        .then(() => res.status(200).json({message : 'Commentaire ajouté', data: {comments: post.comments}}))
        .catch(error => res.status(401).json({ error }));
    })
    .catch(error => { res.status(400).json({ error })}, console.log("error catch post"))
}; 
    

exports.modifyPost = (req, res, next) => {
    PostsList.findOne({ _id: req.params.id })
    .then((post) => {
        if (req.body.image_delete === 'true' || (req.file !== undefined && post.imageUrl !== null)) {
            const filename = post.imageUrl.split('/images/')[1]
            fs.unlink(`images/${filename}`, (error) => {
                error && console.log(error)
            })
            req.body.imageUrl = null
        }
        const postObject = req.file
            ? {
                  ...req.body,
                  imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
              }
            : {
                  ...req.body,
              }
        PostsList.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Votre publication a bien été mise à jour.' , data: {content: post.content}}))
            .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }))
    })
    .catch((error) => {
        res.status(500).json({ error: 'Une erreur est survenue.' })
    })
}
    /*const postObject = req.file
    ? {
          ...req.body,
          imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}` : null,
      }
    : {
          ...req.body,
      }
    PostsList.findOne({_id: req.params.id})
        .then((post) => {
            if (post.userId != req.auth.userId && req.auth.isAdmin != true) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
    PostsList.updateOne({ _id: req.params.id},{ ...postObject, _id: req.params.id} )
        .then(() => res.status(200).json({message : 'Post modifié!', data: {content: post.content}}))
        .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
   };*/
//essai ligne 59
//{ ...postObject, _id: req.params.id, content: req.body.content}


exports.deletePost = (req, res, next) => {
    PostsList.findOne({ _id: req.params.id})

    .then(post => {
        if (req.auth.isAdmin != true && post.userId != req.auth.userId ) {
            res.status(401).json({message: 'Not authorized'});
        } else {
                PostsList.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message: 'Post supprimé !'})})
                    .catch(error => res.status(401).json({ error }));
        }
        })
    .catch( error => {
        res.status(500).json({ error });
});
};

/*const filename = post.imageUrl.split('/images/')[1];
fs.unlink(`images/${filename}`, () => {*/

exports.likePost = (req, res, next) => {
    let liked = req.body.like;
    let userId = req.body.userId;
    let postId = req.params.id;
    console.log(liked);
    console.log(userId);
    console.log(postId);
    if (liked === 1) {
        PostsList.findOne({_id: postId})
        .then((post) => {
            if (!post.usersLiked.includes(userId) && !post.usersDisliked.includes(userId) ) {
                PostsList.updateOne({_id: postId} ,{$push: {usersLiked: userId}, $inc:{likes: +1}})
                .then(() => res.status(200).json({message : 'Like ajouté', data: {like: post.likes + 1}}))
                .catch(error => res.status(401).json({ error }));
            } else {
                console.log('user à déjà liké ce post');
                res.status(200).json({message: 'User à déjà liké', data: {like: post.likes}})
            }
        });
    }
    if(liked === 0) {
        PostsList.findOne({_id: postId})
        .then((post) => {
            if (post.usersLiked.includes(userId)) {
                PostsList.updateOne({_id: postId}, {$pull: {usersLiked: userId}, $inc:{likes: -1}})
                .then(() => res.status(200).json({message : 'Like annulé', data: {like: post.likes -1}}))
                .catch(error => res.status(400).json({ error }));
            }
            if (post.usersDisliked.includes(userId)) {
                PostsList.updateOne({_id: postId}, {$pull: {usersDisliked: userId}, $inc:{dislikes: -1}})
                .then(() => res.status(200).json({message : 'Disike annulé', data: {dislike: post.dislikes -1}}))
                .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(401).json({ error }));
    }
    
    if(liked === -1){
        PostsList.findOne({_id: postId})
        .then((post) => {
            if (!post.usersDisliked.includes(userId) && !post.usersLiked.includes(userId)) {
                PostsList.updateOne({_id: postId} ,{$push: {usersDisliked: userId}, $inc:{dislikes: +1}})
                .then(() => res.status(200).json({message : 'Dislike ajouté', data: {dislike: post.dislikes + 1}}))
                .catch(error => res.status(401).json({ error }));
            } else {
                console.log('user à déjà disliké ce post');
                res.status(200).json({message: 'User à déjà disliké', data: {dislike: post.dislikes}})
            }
        });
        }
};

exports.getOnePost = (req, res, next) => {
    PostsList.findOne({_id: req.params.id})
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(404).json({error}));
};

exports.getAllPost = (req, res, next) => {
    PostsList.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({error}))
    }





    /*     PostsList.find((err, docs) => {
        if(!error) res.send(docs);
        else console.log('Error' + err);   PostsModel.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({error}))*/ 

