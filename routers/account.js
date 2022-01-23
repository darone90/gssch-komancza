const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../public/models/userDB.js');
const {errorHandle, readErrorHandle, clearErrorHandle} = require('../utils/handlers.js');
const {hashHandle, compareHash} = require('../utils/crypto.js');

router

    .all('*', (req, res, next) => {
        if(!req.session.master) {
            errorHandle(res, 'brak wymaganych uprawnień', 'error-outofpermission')
            return;
        };
        next();
    })

    .get('/errorlog/all', async (req, res) => {

        try {
            const errorArray = await readErrorHandle();
            res.json(errorArray);
        } catch (err) {
            errorHandle(res, err, 'errorlog-problem-read')
        }
    })
    .post('/confirm', async (req, res) => {
        try {

            const password = req.body.password;
            const user = await User.findOne({codeOne : req.cookies['user-name']});
            const confirm = await compareHash(password, user.codeTwo);

            if(confirm) {
                res.json({confirm: true})
            } else {
                throw new Error('Potwierdzenie hasła nie powiodło się ')
            }
        } catch (err) {
            errorHandle(res, err, "user-confirmation-problem")
        }
    })

    .post('/add', async (req, res) => {

        try {
            const {name, password, permissions} = req.body;
            const users = await User.find({});

            const checkName = users.find(user => user.codeOne === name);
            if(checkName) {
                throw new Error('Użytkownik o podanej nazwie już istnieje')
                return;
            } else {
                const hash = await hashHandle(password);
                const data = {
                    codeOne : name,
                    codeTwo : hash,
                    codeThree : permissions,
                }
                const toSend = new User(data);
                await toSend.save();
                res.json({ok: true});
            } 
        } catch (err) {
            errorHandle(res, err, 'newuser-samename');
        };
    })

    .get('/*', (req, res) => {
        res.sendFile(path.resolve('../public/accounts.html'));
    })

module.exports = router;