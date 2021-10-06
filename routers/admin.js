const express = require('express');
const router = express.Router();
const path = require('path');

router.all('*', (req,res,next) => {
    if(!req.session.admin) {
        res.redirect('/login');
        return;
    };
    next();
})

router.get('/', (req,res) => {

    res.sendFile(path.resolve('../public/admin.html'));
})

router.get('/accounts', (req, res) => {
    if(!req.session.master) {
        res.send('Niestety nie posiadasz wystraczających uprawnień aby zobczyć stronę, dostęp nie został przyznany');
    } else {
        res.sendFile(path.resolve('../public/accounts.html'))
    }
})

module.exports = router;