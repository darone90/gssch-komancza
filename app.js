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

const loginRouter = require('./routers/login.js');
const adminRouter = require('./routers/admin.js');
const accountRouter = require('./routers/account.js');

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

app.get('/newsdata', (req,res) => {
    News.find({}, (err, data)=> {
        if(err) {
            console.log('Wystąpił błąd wczytywania danych z bazy...', err)
            app.get('/error/info', (req, res)=> {
                res.json(err);
            });
            res.redirect('/error');
        } else {
            res.json(data);
        };
    });
   
});

app.get('/assortmentdata', (req, res) => {
    Asso.find({}, (err, data) => {
        if(err) throw new Error
        else res.json(data);
    })
})
app.get('/readanno', (req,res) => {
    Anno.find({}, (err,data) => {
        if ( err ) {
            throw new Error;
        } else {
            res.json(data);
        };
    })
});

app.get('/admingo', (req, res) => {
    res.redirect('/admin');
})

app.post('/sendmessage',  (req, res) => {
    const data = req.body;
    const newMessage = new Message(data);

    newMessage.save(err => {
        if(err) throw new Error
        else console.log('Wiadomość wysłana poprawnie');
    });
    res.json({
        sucess: 'true',
    });
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
