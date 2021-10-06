const express = require('express');
const router = express.Router();
const path = require('path')
const User = require('../public/models/userDB.js');


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

        users.forEach( person => {
            if(person.name === user && person.password === password) {
                isUserCorrect = true;
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
            res.redirect('/admin');
        } else {
            res.json({
                loged : 'uncorrect',
            });
        }
    });
});

// router.get('/adduser', (req, res) => {
//     const userData = {
//         name : 'Leame',
//         password : 'slave',
//         codedsalt : 'not necessery yet',
//         permissions : false
//     };
//     const userSend = new User(userData);
//     userSend.save((err) => {
//         if(err) throw new Error
//         else console.log('poszło')
//     });
//     res.redirect('/login');
// })

module.exports = router;