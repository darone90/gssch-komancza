const express = require('express');
const router = express.Router();
const path = require('path');
const {unlink} = require('fs').promises;
const Message = require('../public/models/messageDB.js');
const Anno = require('../public/models/annoucementsDB.js');
const News = require('../public/models/newsDB.js');
const Asso = require('../public/models/assortmentDB.js');

const multer = require('multer');
const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, '../public/images/imagesDB/');
    } ,
    filename : function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    } 
});

const attachementStorage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, '../public/attachement');
    },
    filename : function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage : storage});
const uploadAttachement = multer({storage : attachementStorage});


router.all('*', (req,res,next) => {
    if(!req.session.admin) {
        res.redirect('/login');
        return;
    };
    next();
});

router.get('/get-assortment', (req, res) => {
    Asso.find({}, (err, data) => {
        if (err) {
            throw new Error('Nie można wczytać produktów', err);
        } else {
            res.json(data);
        };
    });

});

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

router.post('/remove-product', async(req, res) => {
    const filter = req.body;
    await Asso.findByIdAndRemove(filter);
    res.json({ok:true});

})
router.post('/add-assortment',upload.single('foto'), (req, res) => {

    const foto = req.file ? req.file.filename : null;
    const {title, description} = req.body;

    const data = {
        title,
        description,
        foto,
    };

    const toSend = new Asso(data);
    toSend.save(err => {
        if (err) {throw new Error('Wystąpił problem przy zapisie produktu', err)}
        else {
            res.json({ok:true});
        }
    })
});

router.post('/find-product', (req, res) => {
    
    const filter = req.body;
    Asso.findOne(filter, (err, data) => {
        if (err) {
            throw new Error('Problem z pobraniem elementu', err)
        } else {
            res.json(data)
        };
    });
});

router.post('/get-article', (req, res) => {

    const filter = req.body;
    News.findOne(filter, (err, data) => {
        if(err){
            throw new Error('problem z wczytaniem artykułu z bazy danych', err);
        } else {
            res.json(data);
        };
    });
});

router.post('/remove-foto', async (req, res) => {
    
    const filter = req.body;
    const update = {foto: null}
    await News.findOneAndUpdate(filter, update);
    const path = '../public/images/imagesDB/' + `${req.body.foto}`;
    await unlink(path);

    res.json({ok:true});

})

router.post('/remove-product-foto', async (req, res) => {
    const filter = req.body;
    const update = {foto: null};
    await Asso.findOneAndUpdate(filter, update);
    const path = '../public/images/imagesDB/' + `${req.body.foto}`;
    await unlink(path);

    res.json({ok:true});
})

router.post('/update-product', async(req, res) => {

    const {_id, title, description} = req.body;

    const foto = req.file ? req.file.filename : false;
    
    const filter = {_id};
        
    if(foto) {
        Asso.findOne(filter, async (err, data) => {
            if(err) {
                throw new Error('błąd wczytywania', err)
            } else {
                if(data.foto === null){
                    return;
                } else {
                const path = '../public/images/imagesDB/' + `${data.foto}`
                await unlink(path);
                }
            }
        });

        const dataToSend = {
            title,
            description,
            foto,
        };        
        await Asso.findOneAndUpdate(filter, dataToSend);
        res.json({ok: true});
    } else {
        const dataToSend = {
            title,
            description,
        };
        await Asso.findOneAndUpdate(filter, dataToSend);
        res.json({ok: true});
    }
});

router.post('/remove-article', async (req, res) => {
        
    const filter = req.body;
    await News.findByIdAndRemove(filter);
    res.json({ok:true});

});
router.post('/update-article', upload.single('foto'), async (req, res) => {

    const {_id, title, date, description} = req.body;

    const foto = req.file ? req.file.filename : false;
    
    const filter = {_id};
    const newTitle = title;
    const newDate = date;
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
    if(foto) {
        News.findOne(filter, async (err, data) => {
            if(err) {
                throw new Error('błąd wczytywania', err)
            } else {
                if(data.foto === 'null' || data.foto === ''){
                    return;
                } else {
                const path = '../public/images/imagesDB/' + `${data.foto}`
                await unlink(path);
                }
            }
        });
        const dataToSend = {
            title: newTitle,
            date: newDate,
            description: descriptionToSend,
            foto,
        };        
        await News.findOneAndUpdate(filter, dataToSend);
        res.json({ok: true});
    } else {
        const dataToSend = {
            title: newTitle,
            date: newDate,
            description: descriptionToSend,
        };
        await News.findOneAndUpdate(filter, dataToSend);
        res.json({ok: true});
    }
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

        const foto = req.file ? req.file.filename : null;

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

router.post('/add-annoucement', uploadAttachement.array('attachements',8), (req,res) => {

    const attachements = [];
    req.files.forEach(el => {
        const newName = el.filename;
        const oldName = el.originalname.split('.')[0];
        const objToPush = {
            newName,
            oldName
        };
        attachements.push(objToPush);
    });
    const {title, date, description} = req.body;
    console.log(attachements);
    const data = {
        title,
        date,
        description,
        attachements,
    };

    const toSend = new Anno(data);
    // toSend.save(err => {
    //     if (err) {
    //         throw new Error;
    //         res.json({ok: false});
    //     } else {
    //         res.json({ok:true});
    //     };   
    // });  
    res.json({ok: true});
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