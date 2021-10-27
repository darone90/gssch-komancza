const express = require('express');
const router = express.Router();
const path = require('path');
const Message = require('../public/models/messageDB.js');
const Anno = require('../public/models/annoucementsDB.js');
const News = require('../public/models/newsDB.js');

const multer = require('multer');
const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, '../public/images/imagesDB/');
    } ,
    filename : function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    } 
})

const upload = multer({storage : storage});


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

router.get('/get-articles', (req, res) => {
    News.find({}, (err, data) => {
        if(err) {
            throw new Error('Błąd wczytywania artykułów');
        } else {
            res.json(data);
        };
    });
});

router.post('/add-news',upload.single('foto'), (req, res) => {
        
        const {title, date, description} = req.body;


        const parag = description.split(/(<,)/);
        let i = parag.length;
        const descriptionToSend = [];
        parag.forEach(p => {
            if(i%2 !== 0){
                descriptionToSend.push(p);
                i--;
            } else {
                i--;
            } 
        });

        
        const foto = req.file ? req.file.filename : 'null';

        const data = {
            title,
            date,
            description : descriptionToSend,
            foto,
        };

       
        
        const toSend = new News(data);
        toSend.save(err => {
            if(err) {
                throw new Error('Wystąpił błąd przy zapisie', err)
            } else {
                res.json({ok:true});
            };
        });
});

router.post('/anno-delete', async (req, res) => {

    const filter = req.body;
    await Anno.findByIdAndRemove(filter);
    res.json({ok: true});
})

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

    
    
});

router.post('/anno-find', (req, res) => {

    const filter = req.body;

    Anno.findOne(filter, (err, data) => {
        if(err) {
            throw new Error('Nie można wczytać ogłoszenia')
        } else {
            res.json(data);
        }
    })
});

router.post('/anno-edit', async (req, res) => {

        const filter = {_id: req.body._id}
        const update = {
            title: req.body.title,
            date: req.body.date,
            description: req.body.description
        }
        await Anno.findOneAndUpdate(filter, update);
        res.json({ok: true});
})

router.get('/*', (req,res) => {

    res.sendFile(path.resolve('../public/admin.html'));
});

module.exports = router;