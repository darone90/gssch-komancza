const express = require('express');
const router = express.Router();
const path = require('path');
const {unlink, readFile} = require('fs').promises;
const Message = require('../public/models/messageDB.js');
const Anno = require('../public/models/annoucementsDB.js');
const News = require('../public/models/newsDB.js');
const Asso = require('../public/models/assortmentDB.js');
const Doc = require('../public/models/documentDB.js');
const {readCounter, checkCounter} = require('../utils/dataCounter');
const {maxAgeSession} = require('../config.js');

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
        cb(null, '../public/attachement/');
    },
    filename : function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const documentStorage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, '../public/documents/');
    },
    filename : function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage : storage});
const uploadAttachement = multer({storage : attachementStorage});
const uploadDocument = multer({storage : documentStorage});


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

router.get('/get-documents', async (req, res) => {
    const data = await Doc.find({});
    res.json(data);
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
    const data = await Asso.findOne(filter)
    const fotoToRemove = data.foto;

    if(fotoToRemove !== null) {
        const path = '../public/images/imagesDB/' + `${fotoToRemove}`
        await unlink(path)
    };

    await Asso.findByIdAndRemove(filter);
    res.json({ok:true});

})
router.post('/add-documet', uploadDocument.single('doc'), async (req, res) => {

    const original = req.file.originalname;
    const base = req.file.filename;
    const createdBy = req.body.user

    const data = {
        original,
        base,
        createdBy
    };
    
    const toSend = new Doc(data);
    await toSend.save();

    res.json({ok:true});
});

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
    const article =  await News.findById(filter)
    const foto = article.foto

    if(foto !== null) {
        const path = '../public/images/imagesDB/' + `${foto}`;
        await unlink(path);
    };
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
router.post('/delete-doc', async (req, res) => {
    const filter = req.body._id
    const data = await Doc.findById(filter);
    const basename = data.base;

    await Doc.findByIdAndDelete(filter);
    const path = '../public/documents/' + `${basename}`
    await unlink(path);

    res.json({ok:true});
})

router.post('/anno-delete', async (req, res) => {

    const filter = req.body;
    const anno = await Anno.findById(filter);
    const attachement = anno.attachements;

    if(attachement.length > 0) {
        attachement.forEach(async (el) => {
            const name = el.newName;
            const path = '../public/attachement/' + `${name}`;
            await unlink(path);
        })
    }

    await Anno.findByIdAndRemove(filter);
    res.json({ok: true});
})

router.post('/anno-archive', async (req,res) => {
    const filter = {_id : req.body._id};
    const update = {archived: req.body.archive};
    await Anno.findByIdAndUpdate(filter, update);
    res.json({ok:true});
});

router.post('/article-archive', async (req,res) => {
    const filter = {_id : req.body._id};
    const update = {archived: req.body.archive};
    await News.findByIdAndUpdate(filter, update);
    res.json({ok:true});
});

router.get('/download/:id/:name', (req,res) => {

    const path = `../public/attachement/${req.params.id}`;
    const name = req.params.name;
    res.download(path, name);
});

router.get('/downloaddoc/:id/:name', (req,res) => {
    const path = `../public/documents/${req.params.id}`
    const name = req.params.name;
    res.download(path, name);
})


router.post('/unread-read', async (req, res) => {

    const filter = {_id : req.body.id};
    const update = {readed: true};
    await Message.findOneAndUpdate(filter, update)
    res.json({ok: true});
});

router.post('/delete-att', async (req, res) => {

    const {name, id} = req.body;
    const anoucement = await Anno.findOne({_id: id})
    const newAttList = anoucement.attachements.filter(el => el.newName !== name);

    const path = `../public/attachement/${name}`;
    await unlink(path);

    await Anno.findByIdAndUpdate({_id: id}, {attachements: newAttList});

    res.json({ok: true});

});

router.post('/edit-annoucement', uploadAttachement.array('attachements',8), async (req, res) => {

    const {_id, title, date, description} = req.body;
    const old = await Anno.findOne({_id});
    const newAttArr = old.attachements;

    

    req.files.forEach(el => {
        const newName = el.filename;
        const oldName = el.originalname.split('.')[0];
        const objToPush = {
            newName,
            oldName
        };
        newAttArr.push(objToPush);
    });

    const titleUpdate = title ? title : old.title;
    const dateUpdate = date ? date : old.date;
    const descriptionUpadte = description ? description : old.description;

    await Anno.findByIdAndUpdate({_id}, {attachements: newAttArr, title: titleUpdate, date: dateUpdate, description: descriptionUpadte});

    res.json({ok: true});
});

router.post('/delete', async(req, res) => {

    const filter = {_id : req.body.id};
    await Message.findByIdAndRemove(filter);
    res.json({ok : true});
})

router.post('/add-annoucement', uploadAttachement.array('attachements',8), async (req,res) => {

    let size = 0;
    const attachements = [];
    req.files.forEach(el => {
        const newName = el.filename;
        const oldName = el.originalname.split('.')[0];
        const objToPush = {
            newName,
            oldName
        };
        attachements.push(objToPush);
        size += el.size;
    });

    if(checkCounter('content', size/1000, 'add')) {
    const {title, date, description} = req.body;
    const data = {
        title,
        date,
        description,
        attachements,
    };
    
    const toSend = new Anno(data);
    toSend.save(err => {
        if (err) {
            throw new Error;
            res.json({ok: false});
        } else {
            res.json({ok:true});
        };   
    });  
    } else {
        req.files.forEach(el => {
            const path = `../public/attachement/${el.filename}`;
            await unlink(path);
        })
        res.redirect('/error')
    }
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

router.get('/*', async (req,res) => {
    const contentLimit = await readCounter('content');
    const baseLimit = await readCounter('database');

    res
        .cookie('content-limit', contentLimit, {
            maxAge: maxAgeSession,
            sameSite: 'strict',
        })
        .cookie('base-limit', baseLimit, {
            maxAge: maxAgeSession,
            sameSite: 'strict',
        })
        .sendFile(path.resolve('../public/admin.html'));
});

module.exports = router;