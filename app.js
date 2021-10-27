const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');
const News = require('./public/models/newsDB.js');
// const {readFile} = require('fs').promises;
const Anno = require('./public/models/annoucementsDB.js');
const Message = require('./public/models/messageDB.js');
const Asso = require('./public/models/assortmentDB');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');



// rate limitera dodać
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



const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

app.get('/error', (req,res) => {
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

// app.get('/assoadd', async (req,res) => {
//     const foto = await readFile('../public/images/fullsize/bagiet.jpg', 'base64');

//     const assoInfo = {
//         title : 'Nowy zajebisty bagiet',
//         description : 'Przykładowy opis zajebistego bagieta którego nikt jeszcze nie produkuje chociaż może warto zacząć czy coś takiego, no musi być jakiś opis tego gówna na próbę', 
//         foto : foto,
//     };

//     const asso = new Asso(assoInfo);
//     asso.save((err)=> {
//         if(err) throw new Error
//         else console.log('poszło');
//     });

//     res.redirect('/');

// });
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
// });

module.exports = app;
