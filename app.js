/**
 * Created by Administrator on 2016/4/15.
 */
var express = require('express');  //express 框架
var path = require('path');
var favicon = require('serve-favicon');
var ejs=require('ejs');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./route/routes');
var app = express();
app.use('*',function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }
    else {
        next();
    }
});
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

var BASE_TEMPLATE_DIR ="D://myproject/adminserver_html";
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine', ejs);
app.set('html',BASE_TEMPLATE_DIR + '/html');
app.use('/', routes);


//日志
var log4js = require('log4js');
log4js.configure('config/log4js.json');
global.logger = log4js.getLogger();
app.use(log4js.connectLogger(logger,
    {
        format: ':method :url HTTP/:http-version :status :res[content-length] - :response-time ms',
        nolog: ["\\.jpg", "\\.ico", "\\.png", "\\.gif", "\\.js", "\\.css", "\\.swf"]
    }));

module.exports = app;