/**
 * Created by Administrator on 2016/4/15.
 * node 服务器
 */
'use strict';

var http = require('http');
//var test=require('./config/test');
var config = require('./config');
var port = config.port;
var app = require('./app');
app.set('port', port);
var fs = require('fs');
var path = require('path');

var server = http.createServer(app);
/**
 * 配置监听接口等
 */
server.listen(app.get('port'), '0.0.0.0', function (err, restult) {
    if (!err) {
        console.log('ckey server is running', app.get('port'));
    }
});

server.on('error', onError);
server.on('listening', onListening);
/**
 * 服务器错误机制
 * @param error
 */
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
 * 监听服务器机制
 * 暂时没用
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    var uploadDir = path.resolve('.') + path.sep + "upload" + path.sep + "tmp" + path.sep;
    if (!fs.existsSync(uploadDir)) {
        // fs.mkdirSync(uploadDir,'0777', true);
        //不能创建连续目录
        var mkdirp = require('mkdirp');
        mkdirp(uploadDir, function (err) {
            if (err) {
                console.log("create upload/tmp  director failure." + err);
            }
            // path exists unless there was an error
        });
    }
    var uploadDir2 = path.resolve('.') + path.sep + "upload" + path.sep + "tags" + path.sep;
    var uploadDir3 = path.resolve('.') + path.sep + "logs";
    if (!fs.existsSync(uploadDir2)) {
        // fs.mkdirSync(uploadDir,'0777', true);
        //不能创建连续目录
        var mkdirp = require('mkdirp');
        mkdirp(uploadDir2, function (err) {
            if (err) {
                console.log("create upload/tmp  director failure." + err);
            }
            // path exists unless there was an error
        });
        mkdirp(uploadDir3, function (err) {
            if (err) {
                console.log("create logs  director failure." + err);
            }
            // path exists unless there was an error
        });
    }
    console.log(bind);
}
