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

router.get('/*', (req,res) => {

    res.sendFile(path.resolve('../public/admin.html'));
});

module.exports = router;