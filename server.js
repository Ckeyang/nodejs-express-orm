/**
 * Created by Administrator on 2016/4/15.
 */
'use strict';
var app = require('./app');
var http = require('http');
var config = require('./config/config.js');
var port=config.port;
app.set('port', port);

var server = http.createServer(app);

server.listen(app.get('port'), '127.0.0.1', function (err, restult) {
    if (!err) {
        console.log('ckey server is running', app.get('port'));
    }
});

server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
   // debug('Listening on ' + bind);
   // console.log(bind);
}
