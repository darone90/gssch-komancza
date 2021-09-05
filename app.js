const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');
const News = require('./public/models/newsDB.js');
let dataObj = {};



mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const database = mongoose.connection;
database.on('error', () => {console.error('database connection error')});
database.once('open', () => {
    console.log('database MongoDB is connected');
});



const app = express();
app.use('/public', express.static(path.resolve(__dirname, 'public')));

app.get('/newsdata', (req,res) => {
    News.find({}, (err, data)=> {
        if(err) {
            console.log('Wystąpił błąd wczytywania danych z bazy...', err)
            app.get('/error/info', (req, res)=> {
                res.json(err);
            });
            res.redirect('/error');
        } else {
        dataObj = data;
        res.json(dataObj);
        };
    });
   
});

app.get('/error', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'error.html'))
});

app.get('/*', (req, res)=> {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});


module.exports = app;
