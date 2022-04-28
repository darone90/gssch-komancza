const express = require('express');
require('express-async-errors');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const path = require('path');
const config = require('./config');
const News = require('./public/models/newsDB.js');
const Anno = require('./public/models/annoucementsDB.js');
const Message = require('./public/models/messageDB.js');
const Asso = require('./public/models/assortmentDB');
const Shop = require('./public/models/bakeryDB');
const loginRouter = require('./routers/login.js');
const adminRouter = require('./routers/admin.js');
const accountRouter = require('./routers/account.js');
const {coding} = require('./utils/crypto');
const {errorHandle} = require('./utils/handlers')

mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const database = mongoose.connection;
database.on('error', () => {console.error('database connection error')});
database.once('open', () => {
console.log('database MongoDB is connected');
});

const limiter = rateLimit({
    windowMs: 15*60*1000,
    max: 550,
    standardHeaders: true,
    legacyHeaders: false,
})



const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(cookieParser());
app.use(cookieSession({
    name: 'loged',
    keys: config.keySession,
    maxAge: config.maxAgeSession
}));


app.use('/login', loginRouter);
app.use('/admin', adminRouter);
app.use('/accounts', accountRouter);

app.use('/public', express.static(path.resolve(__dirname, 'public')));


app.get('/error/*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'error.html'))
});

app.get('/newsdata', async (req,res) => {
    try {
        const data = await News.find({archived: false});
        res.json(data)

    } catch(err) {
        errorHandle(res, err, "readNews-database")
    };
});

app.get('/assortmentdata', async (req, res) => {

    try {
        const data = await Asso.find({})
        res.json(data)
    } catch(err) {
        errorHandle(res, err, "assortment-reading")
    };
});

app.get('/readanno', async (req,res) => {
    try {
        const data = await Anno.find({archived: false})
        res.json(data)
    } catch(err) {
        errorHandle(res, err, "annoucement-reading")
    }
});

app.get('/shop/change/:filter', async (req, res) => {
    const filter = {title: req.params.filter};
    try {
        const data = await Shop.findOne(filter);
        res.json(data);
    } catch (err) {
        errorHandle(res, err, 'databaseproblem-read-shop')
    }
});

app.get('/admingo', (req, res) => {
    res.redirect('/admin');
})

app.post('/sendmessage',  async (req, res) => {
    const {name, subject, content, contact} = req.body;
    const reqData = req.body;
    try {
        const nameCoded = await coding(name);
        const subjectCoded = await coding(subject);
        const contentCoded = await coding(content);
        const contactCoded = await coding(contact);
        const dataToSend = {...reqData,
                            name: nameCoded,
                            subject: subjectCoded,
                            content: contentCoded,
                            contact: contactCoded
                        };
        const newMessage = new Message(dataToSend); 
        await newMessage.save();
        res.json({
            sucess: 'true',
        });
    } catch(err) {
        errorHandle(res, err, "message-sending")
    }
});
app.get('/download/:docID/:docName', (req, res) => {
    const path = `../public/attachement/${req.params.docID}`;
    const name = req.params.docName;
    res.download(path, name);
});

app.get('/logout', (req, res) => {
    req.session = null;
    res
        .clearCookie('user-name')
        .redirect('/');
});

app.get('/*', (req, res)=> {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});


module.exports = app;
