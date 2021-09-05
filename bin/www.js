const app = require('../app.js');


const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);



app.listen(port, ()=> {
    console.log('Serwer started...')
});

app.on('error', onError)

function onError(error) {
    if(error.syscall !== 'listen') {
        throw error
    };

    const bind = typeof port === 'string' ? 'Pipe' + port : "Port" + port;

    switch (error.code) {
        case 'EACCES': 
            console.error(bind + 'requires elevated privileges');
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + 'is already in use');
            process.exit(1);
            break;
        default: 
            throw error;
    };
};



function normalizePort(val) {
    const port = parseInt(val,10);

    if (isNaN(port)) {
        console.log('port name is not a number');
        return val;
    }
    if(port >= 0) {
        console.log(`port number: ${port}`);
        return port;
    };

    return false ;
};