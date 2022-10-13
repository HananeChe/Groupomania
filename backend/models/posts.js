const mongoose = require('mongoose');

const postModel = mongoose.Schema({
    userId: {type: String, required: true},
    userName: {type: String},
    content: {type: String, required: true},
    imageUrl: {type: String},
    comments : {type: [{
        commenterId: String,
        commenterPseudo: String,
        text: String,
    }]},
    likes: {type: Number},
    dislikes: {type: Number},
    usersLiked: {type: Array},
    usersDisliked: {type: Array},
});
module.exports = mongoose.model('PostsList', postModel);