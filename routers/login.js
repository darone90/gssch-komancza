const express = require('express');
const router = express.Router();
const path = require('path')
const User = require('../public/models/userDB.js');
const {errorHandle} = require('../utils/handlers.js');
const {decoding, hashHandle, coding, compareHash} = require('../utils/crypto.js');
const {maxAgeSession} = require('../config.js');


router.get('/', (req,res) => {
    if(!req.session.admin){
    res.sendFile(path.resolve('../public/login.html'))
    } else {
        res.redirect('/admin');
    }
});

router.post('/', async (req,res) => {
 
    try {
        const user = req.body.user;
        const password = req.body.password;
        const data = await User.findOne({codeOne : user});
        if(data !== null) {
            const compare = await compareHash(password, data.codeTwo);
            if(compare) {
                req.session.admin = 1;
                const userName = user;
                if(data.codeThree) {
                    req.session.master = 1;
                };
                res
                    .cookie('user-name', userName, {
                        maxAge: maxAgeSession,
                    })
                    .redirect('/admin');

            } else {
                res.json({acces: 'denied'});
            }
        } else {
            res.json({acces: 'denied'});
        }
    } catch (err) {
        errorHandle(res, err, 'userslist-download-problem')
    };
});


module.exports = router;