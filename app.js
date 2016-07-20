/**
 * Created by Administrator on 2016/4/15.
 * 主入口 app.server
 * 此项类配置项目需要的各种东西
 * git@192.168.0.3:scm/closetdiary_adminserver.git
 */
var config = require('./config');
var express = require('express');  //express 框架
var path = require('path');
var favicon = require('serve-favicon');
var ejs = require('ejs');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var sessionStore = new session.MemoryStore({reapInterval: 300 * 1000});
var bodyParser = require('body-parser');
var routes = require('./route/routes');
var app = express();
/**
 * 设置请求头
 */
app.use('*', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser('test'));
/**
 * 设置session
 */
app.use(session({
    store: sessionStore,
    secret: 'ckey',
    cookie: {maxAge: 15 * 60 * 1000},
    rolling: true,
    resave: true,
    saveUninitialized: true
}));
/**
 * 检查session
 */
app.use(function (req, res, next) {
    var url = req.url;
    if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(url)) {
        next();
    } else {
        var requestMethod = req.method;
        var apiKey = req.header("apiKey");
        if ((apiKey != "" && apiKey != undefined) && apiKey == config.apiKey) {
            next();
        }
        else {
            var isfirst = req.session.isfirst;
            var islogin = req.session.islogin;
            if (typeof islogin != 'undefined' || isfirst == 1) {
                next();
            } else {
                req.session.isfirst = 1;
                res.redirect('/');
            }
        }
    }
});

app.use(express.static(path.join(__dirname, '/upload')));

var BASE_TEMPLATE_DIR = config.baseDir;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', BASE_TEMPLATE_DIR);
app.use('/', routes);
app.use(function (req, res, next) {
    res.status(404).render('404.html');
});
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