const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    nom: {type: String},
    prenom: {type: String},
    picture : {type: String, default: "..../profil-pic.png"},
    email : {type: String, required: true, unique: true},
    password :{type: String, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);