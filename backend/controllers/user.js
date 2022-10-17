const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { rmSync } = require('fs');


exports.signup = (req, res, next) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User ({
            role: req.body.role,
            userName: req.body.userName,
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(user === null){
            res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'});
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid)
                res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'});
                else {
                        const token = jwt.sign( 
                            {userId: user._id, isAdmin: user.isAdmin},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )
                    res.header('Authorization', 'Bearer' + token);
                    return res.json({token, userId: user._id, isAdmin: user.isAdmin})
                }
            })
            .catch(error => res.status(500).json({ error }))
        }
    })
    .catch(error => res.status(500).json({ error }))
};

exports.getOneUser = (req, res, next) => {
    User.findOne({_id: req.params.id})
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({error}))
}; 

exports.getAllUsers = (req, res, next) => {
    User.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({error}))
}

