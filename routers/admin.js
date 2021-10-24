const express = require('express');
const router = express.Router();
const path = require('path');
const Message = require('../public/models/messageDB.js');
const Anno = require('../public/models/annoucementsDB.js');
const { truncate } = require('fs/promises');

router.all('*', (req,res,next) => {
    if(!req.session.admin) {
        res.redirect('/login');
        return;
    };
    next();
})
router.get('/show-messages', (req ,res) => {
    Message.find({}, (err, data) => {
        if(err) {
            throw new Error('błąd wczytywania wiadomości')
        } else {
            res.json(data);
        };
    });
});

router.get('/get-anno', ( req, res) => {
    Anno.find({}, (err, data) => {
        if(err) {
            throw new Error('błąd wczytywania ogłoszeń')
        } else {
            res.json(data);
        };
    });
});

router.post('/unread-read', async (req, res) => {

    const filter = {_id : req.body.id};
    const update = {readed: true};
    await Message.findOneAndUpdate(filter, update)
    res.json({ok: true});
});

router.post('/delete', async(req, res) => {

    const filter = {_id : req.body.id};
    await Message.findByIdAndRemove(filter);
    res.json({ok : true});
})

router.post('/add-annoucement', (req,res) => {

    const data = req.body;

    const toSend = new Anno(data);
    toSend.save(err => {
        if (err) {
            throw new Error;
            res.json({ok: false});
        } else {
            res.json({ok:true});
        };
        
    });

    
    
})

router.get('/*', (req,res) => {

    res.sendFile(path.resolve('../public/admin.html'));
});

module.exports = router;