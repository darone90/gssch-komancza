const express = require('express');
const router = express.Router();
const path = require('path');
const {unlink, stat} = require('fs').promises;
const Message = require('../public/models/messageDB.js');
const Anno = require('../public/models/annoucementsDB.js');
const News = require('../public/models/newsDB.js');
const Asso = require('../public/models/assortmentDB.js');
const Doc = require('../public/models/documentDB.js');
const {readCounter, checkCounter, changeCounter} = require('../utils/dataCounter.js');
const {errorHandle} = require('../utils/handlers.js');
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

router
    .get('/anno-get', async (req, res) => {
        try {
            const data = await Anno.find({}).exec();
            res.json(data);
        } catch (err) {
            errorHandle(res, err, 'databaseproblem-readannoucements-all');
        }
    })

    .get('/news-get', async (req, res) => {
        try {
            const data = await News.find({}).exec();
            res.json(data);
        } catch (err) {
            errorHandle(res, err, 'databaseproblem-readnews-all');
        }
    })

    .get('/products-get', async (req, res) => {

        try {
            const data = await Asso.find({});
            res.json(data);   
        } catch (err) {
            errorHandle(res, err, 'databaseproblem-readasso-all');
        };
    })
    
    .get('/anno-find/:id', async (req, res) => {

        const filter = {_id: req.params.id};

        try {
            const data = await Anno.findOne(filter);
            res.json(data);
        } catch (err) {
            errorHandle(res, err, 'databaseproblem-readannoucements-one')
        }
        })

    .get('/news-find/:id', async (req, res) => {

            const filter = {_id: req.params.id};

            try {
                const data = await News.findOne(filter);
                res.json(data);
            } catch (err) {
                errorHandle(res, err, 'databaseproblem-readnews-one')
            }
        })

    .get('/products-find/:id', async (req, res) => {
    
            const filter = {_id : req.params.id};
            try {
                const data = await Asso.findOne(filter);
                res.json(data);
            } catch (err) {
                errorHandle(res, err, 'databaseproblem-readasso-one')
            };
        })
        
    .delete('/anno-delete/:id', async (req, res) => {
            const filter = {_id : req.params.id};
            try {
                const data = await Anno.findOne(filter);
                const attachement = data.attachements;
                await Anno.findByIdAndRemove(filter);
                    if(attachement.length > 0) {
                        await attachement.forEach(async (el) => {
                            try {
                                const name = el.newName;
                                const path = '../public/attachement/' + `${name}`;
                                const fileSize = await stat(path);
                                await unlink(path);
                                await changeCounter('content', fileSize.size, 'subtraction');
                                
                            } catch (err) {
                                errorHandle(res, err, 'diskproblem-delete');
                            };                          
                        });
                        res.json({ok: true});
                } else {
                    res.json({ok: true});
                };
            } catch(err) {
                errorHandle(res, err, 'databaseproblem-delete')
            };  
        })

    .delete('/products-delete/:id', async (req, res) => {

            const filter = {_id : req.params.id};
            try {
                const data = await Asso.findOne(filter)
                const fotoToRemove = data.foto;
        
                if(fotoToRemove !== null) {
                    const path = '../public/images/imagesDB/' + `${fotoToRemove}`
                    const fileSize = await stat(path);
                    changeCounter('content', fileSize.size, 'subtraction');
                    await unlink(path)
            };
        
                await Asso.findByIdAndRemove(filter);
                res.json({ok:true});
            } catch (err) {
                errorHandle(res, err, 'databaseproblem-delete')
            };
        })

    .delete('/news-delete/:id', async (req, res) => {
        
            const filter = {_id: req.params.id};
            try {
                const article =  await News.findById(filter);
                const foto = article.foto;
                if(foto !== null) {
                    const path = '../public/images/imagesDB/' + `${foto}`;
                    const fileSize = await stat(path);
                    changeCounter('content', fileSize.size, 'subtraction');
                    await unlink(path);
                };
                await News.findByIdAndRemove(filter);
                res.json({ok:true});
            } catch(err) {
                errorHandle(res, err, 'databaseproblem-delete')
            };       
        })

    .patch('/archive/:db', async (req,res) => {

            const filter = {_id : req.body._id};
            const update = {archived: req.body.archive};
            try {
                if(req.params.db === 'anno'){
                    await Anno.findByIdAndUpdate(filter, update);
                }
                if(req.params.db === 'news'){
                    await News.findByIdAndUpdate(filter, update);    
                }
                res.json({ok:true});
            } catch (err) {
                errorHandle(res, err, 'databaseproblem-archiving')
            }        
        })

    .patch('/anno-attachement-delete', async (req, res) => {

            const {name, id} = req.body;
             try {
                const anoucement = await Anno.findOne({_id: id});
                const newAttList = anoucement.attachements.filter(el => el.newName !== name);
                const path = `../public/attachement/${name}`;
                const fileSize = await stat(path);
                await unlink(path);
                await Anno.findByIdAndUpdate({_id: id}, {attachements: newAttList});
                await changeCounter('content', fileSize.size,'subtraction');
                res.json({ok: true});
             } catch (err) {
                errorHandle(res, err, 'databasediskproblem-removeattachement');
             }       
        })

    .patch('/news-foto-delete', async (req, res) => {
    
            const filter = req.body;
            const update = {foto: null};

            try {
                await News.findOneAndUpdate(filter, update);
                const path = '../public/images/imagesDB/' + `${req.body.foto}`;
                const fileSize = await stat(path);
                changeCounter('content', fileSize.size, 'subtraction');
                await unlink(path);
                res.json({ok:true});
            } catch (err) {
                errorHandle(res, err, 'databasediskproblem-removeattachement');
            };       
        })
    .patch('/products-foto-delete', async (req, res) => {
        
            const filter = req.body;
            const update = {foto: null};
            await Asso.findOneAndUpdate(filter, update);
            const path = '../public/images/imagesDB/' + `${req.body.foto}`;
            await unlink(path);
        
            res.json({ok:true});
        })

    .put('/anno-edit', uploadAttachement.array('attachements',8), async (req, res) => {

            const {_id, title, date, description} = req.body;
            let size = 0;
            try {
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
                    size += el.size;
                });
                const titleUpdate = title ? title : old.title;
                const dateUpdate = date ? date : old.date;
                const descriptionUpadte = description ? description : old.description;
                if(checkCounter('content', size, 'add')) {
                    await Anno.findByIdAndUpdate({_id}, {attachements: newAttArr, title: titleUpdate, date: dateUpdate, description: descriptionUpadte});
                    res.json({ok: true});
                } else {
                    req.files.forEach(async el => {
                        const path = '../public/attachement/' + `${el.filename}`;
                        try {
                            await unlink(path);
                            errorHandle(res, 'przekroczenie limitu danych', 'databaseproblem-overload')
                        } catch (err) {
                            errorHandle(res, err, 'diskproblem-delete')
                        };
                    });
                };
            } catch (err){
                errorHandle(res, err, 'databaseproblem-editing');
            };         
        })

    .put('/news-edit', upload.single('foto'), async (req, res) => {

            const {_id, title, date, description} = req.body;
            const foto = req.file ? req.file.filename : false;
            console.log(req.file);
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
                    };
                });
            if(foto) {
                if(checkCounter('content', req.file.size, 'add')){
                    try {
                        const data = await News.findOne(filter);
                        if(data.foto === 'null' || data.foto === ''){
                            return;
                        } else {
                            const path = '../public/images/imagesDB/' + `${data.foto}`;
                            const fileSize = await stat(path);
                            changeCounter('content', fileSize.size, 'subtraction');
                            await unlink(path);
                            const dataToSend = {
                                title: newTitle,
                                date: newDate,
                                description: descriptionToSend,
                                foto,
                            };
                            await News.findOneAndUpdate(filter, dataToSend);
                            res.json({ok: true});
                        };
                    } catch (err) {
                        errorHandle(res, err, "databaseproblem-editing");
                };               
            } else {
                errorHandle(res, 'przekroczenie limitu danych', 'databaseproblem-overload')
            };
            } else {
                const dataToSend = {
                    title: newTitle,
                    date: newDate,
                    description: descriptionToSend,
                };
                try {
                await News.findOneAndUpdate(filter, dataToSend);
                res.json({ok: true});
                } catch (err) {
                    errorHandle(res, err, "databaseproblem-editing");
                };
            };
        })

    .post('/anno-add', uploadAttachement.array('attachements',8), async (req,res) => {

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
        
            if(checkCounter('content', size, 'add')) {
                const {title, date, description} = req.body;
                const data = {
                    title,
                    date,
                    description,
                    attachements,
            };
            const toSend = new Anno(data);
            try {
                await toSend.save();
                res.json({ok: true});  
            } catch (err) {
                errorHandle(res, err, 'databaseproblem-addingannoucemet')
            };
            } else {
                req.files.forEach(async el => {
                    const path = `../public/attachement/${el.filename}`;
                    try {
                        await unlink(path);
                    } catch (err) {
                        errorHandle(res, err, 'diskproblem-delete');
                    }
                });
                errorHandle(res, 'przekroczenie limitu danych', 'databaseproblem-overload');
            };
        })

    .post('/news-add',upload.single('foto'), async (req, res) => {
        
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
            };
        });
        const foto = req.file ? req.file.filename : null;
        const fileSize = req.file ? req.file.size : 0;

        if (checkCounter('content', fileSize, 'add')) {

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
        } else {
            const path = '../public/images/imagesDB/' + `${req.file.filename}`;
            try {
                await unlink(path);
            } catch(err){
                errorHandle(res, err, 'diskproblem-delete');
            };
            errorHandle(res, 'przekroczenie limitu danych', 'databaseproblem-overload');
        };
    })











































router.post('/delete-doc', async (req, res) => {
    const filter = req.body._id
    const data = await Doc.findById(filter);
    const basename = data.base;

    await Doc.findByIdAndDelete(filter);
    const path = '../public/documents/' + `${basename}`
    await unlink(path);

    res.json({ok:true});
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

router.get('/get-documents', async (req, res) => {
    const data = await Doc.find({});
    res.json(data);
});

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


router.post('/delete-doc', async (req, res) => {
    const filter = req.body._id
    const data = await Doc.findById(filter);
    const basename = data.base;

    await Doc.findByIdAndDelete(filter);
    const path = '../public/documents/' + `${basename}`
    await unlink(path);

    res.json({ok:true});
})


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

router.post('/delete', async(req, res) => {

    const filter = {_id : req.body.id};
    await Message.findByIdAndRemove(filter);
    res.json({ok : true});
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