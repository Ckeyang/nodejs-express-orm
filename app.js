/**
 * Created by Administrator on 2016/4/15.
 */
var express = require('express');  //express øÚº‹
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./route/routes');
var app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/', routes);

app.use(function (req, res, next) {
    //res.render('404');
});

//»’÷æ
var log4js = require('log4js');
log4js.configure('config/log4js.json');
global.logger = log4js.getLogger();
app.use(log4js.connectLogger(logger,
    {
        format: ':method :url HTTP/:http-version :status :res[content-length] - :response-time ms',
        nolog: ["\\.jpg", "\\.ico", "\\.png", "\\.gif", "\\.js", "\\.css", "\\.swf"]
    }));

module.exports = app;