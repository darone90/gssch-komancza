const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/*', (req, res) => {
    if(!req.session.master) {
        res.send('Niestety nie posiadasz wystraczających uprawnień aby zobczyć stronę, dostęp nie został przyznany');
    } else {
        res.sendFile(path.resolve('../public/accounts.html'))
    }
})

module.exports = router;