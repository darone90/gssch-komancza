const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');
const News = require('./public/models/newsDB.js');
// const {readFile} = require('fs').promises;
const Anno = require('./public/models/annoucementsDB.js');

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
            res.json(data);
        };
    });
   
});
// app.get('/addnews', async (req, res) => {
//     const foto = await readFile('../public/images/fullsize/fotowol.jpg', 'base64');
//     const newsInfo = {
//         title: 'Fotowoltaika - na miare współczesności',
//         date: 'Wiosna 2021',
//         description: {
//             p1: "Gminna Spółdzielnia przystapiła do montażu instalacji fotowoltaicznych, które będą produkować prąd na potrzeby naszego obiektu handlowego gdzie znajduja się Delikatesy Centrum w Komańczy jak również jest to siedziba Spółdzielni. Jest to idealne połączenie nowoczesnej technologii, oszczędności i ekologii.",
//             p2: "Fotowoltaika to inwestycja korzystna na wielu płaszczyznach. Pozwala znacząco ograniczyć koszty zakupu energii elektrycznej, w znacznym stopniu uniezależnić się od dostawcy energii i jego cen, a tym samym widocznie zmniejszyć wydatki firmy. Fotowoltaika to idealne połączenie nowoczesnej technologii, oszczędności i ekologii."
//         },
//         foto: foto,
//     };
//     const newsData = new News(newsInfo);
//     newsData.save((err) => {
//         console.log('poszło')
//     });
//     res.redirect('/')
// })
app.get('/addanno', (req, res) => {
    const annoData = {
        title: 'Przykładowe ogłoszenie',
        date: 'dzisiaj wieczorem',
        description: 'Jakieś tam będzie ważne ogłoszenie na pół jebanej strony w chuj, będą jakieś głupoty tu wypisywać ble ble i bka ka chuja dupa nie widziła'
    }
    const annoToSend = new Anno(annoData);
    annoToSend.save(err => {
        if(err) throw new Error;
        console.log('ogłoszenie wysłane');
    })
    res.redirect('/');
});

app.get('/readanno', (req,res) => {
    Anno.find({}, (err,data) => {
        if ( err ) {
            throw new Error;
        } else {
            res.json(data);
        };
    })
})

app.get('/error', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'error.html'))
});

app.get('/*', (req, res)=> {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});


module.exports = app;
