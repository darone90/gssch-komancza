const app = require('../app.js');
const http = require('http');



const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


const server = http.createServer(app);
server.listen(port, ()=> {
    console.log('Serwer started...')
});

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