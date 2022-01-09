const express = require('express');
const router = express.Router();
const path = require('path');
const {errorHandle, readErrorHandle, clearErrorHandle} = require('../utils/handlers.js');

router

    .get('/*', (req, res) => {
        if(!req.session.master) {
            res.send('Niestety nie posiadasz wystraczających uprawnień aby zobczyć stronę, dostęp nie został przyznany');
        } else {
            res.sendFile(path.resolve('../public/accounts.html'))
        }
    })

    .get('/errorlog/all', async (req, res) => {

        try {
            const errorArray = await readErrorHandle();
            res.json(errorArray);
        } catch (err) {
            errorHandle(res, err, 'errorlog-problem-read')
        }
    })

module.exports = router;