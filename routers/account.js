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
    .get('/read-users', async (req, res) => {
        try {
            const users = await User.find({});
            const safeuser = users.filter(user => user.codeOne !== req.cookies['user-name'])
            res.json(safeuser);
        } catch (err) {
            errorHandle(res, err, "userlist-load-problem")
        }
    })
    .get('/clear-error', async (req, res) => {
        try {
            await clearErrorHandle();
            res.json({ok: true});
        } catch (err) {
            errorHandle(res, err, "errorlog-clearing-problem")
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
    .post('/change', async (req, res) => {

        const id = req.body.id;
        const action = req.body.actionType === 0 ? 'perChange' : 'delete';
        const filter = {_id : id};
        try {
            if(action === 'perChange'){
                const user = await User.findOne(filter);
                const update = {codeThree : !user.codeThree};
                await User.findOneAndUpdate(filter, update);
                res.json({ok: true, id});    
            };
            if(action === 'delete') {
                await User.findByIdAndDelete(filter)
                res.json({ok: true, id});
            };
        } catch(err) {
            errorHandle(res, err, 'changepaermission-database');
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