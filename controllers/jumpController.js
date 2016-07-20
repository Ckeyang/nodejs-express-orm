/**
 * Created by Administrator on 2016/6/2.
 */
var config = require('../config');
var localhost = config.htmlLocalhost;//此处更改环境时要变
exports.login = function (req, res, next) {
    res.render("login/login.html", {message: localhost});
};
exports.logout = function (req, res, next) {
    req.session.destroy();
    var session = req.session;
    res.render("login/login.html", {message: localhost});
};
exports.index = function (req, res, next) {
    var user = req.session.user;
    res.render('index/index.html', {user: user, message: localhost});
};
exports.collocation = function (req, res, next) {
    var user = req.session.user;
    res.render("collocation/collocation.html", {user: user, message: localhost});
};
exports.material = function (req, res, next) {
    var user = req.session.user;
    res.render("material/material.html", {user: user, message: localhost});
};