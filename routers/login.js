const express = require('express');
const router = express.Router();
const path = require('path')
const User = require('../public/models/userDB.js');
const {maxAgeSession} = require('../config.js');


router.get('/', (req,res) => {
    if(!req.session.admin){
    res.sendFile(path.resolve('../public/login.html'))
    } else {
        res.redirect('/admin');
    }
});

router.post('/', (req,res) => {
    
    User.find({}, (err, data) => {
        let users;
        if(err) {
            throw new Error
        } else {
            users = Object.values(data);
        }
        const user = req.body.user;
        const password = req.body.password;
        let isUserCorrect;
        let isMaster;
        let userName;

        users.forEach( person => {
            if(person.name === user && person.password === password) {
                isUserCorrect = true;
                userName = person.name
                if(person.permissions) {
                    isMaster = true;
                }
            };
        });
        
        if(isUserCorrect) {
            req.session.admin = 1;
            
            if(isMaster) {
                req.session.master = 1;
            }
            res
                .cookie('user-name', userName, {
                    maxAge: maxAgeSession,
                })
                .redirect('/admin');
        } else {
            res.json({
                loged : 'uncorrect',
            });
        }
    });
});


module.exports = router;