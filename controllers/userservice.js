/**
 * Created by Administrator on 2016/4/15.
 */
var db = require('../utils/mysqlUtils');
var userModel = require('../models/user');
var fs = require('fs');
var d = db.conn();
var user = userModel.createUserModel(d);
var crypt = require('../utils/crypt');
var localhost = "localhost:1234";
exports.login = function (req, res, next) {
    //定向去login.html
    console.log("goTo login.html!!!!");
    res.render("login/login.html", {message: localhost});
};

exports.onLogin = function (req, res, next) {
    console.log("check user !!!!");
    var password = req.body.password;
    var name = req.body.username;
    console.log(name, password);
    /* res.setHeader('Access-Control-Allow-Origin', '*');*/
    user.find({name: name, password: password}, function (err, u) {
        if (u[0] != null) {
            req.session.isfirst = 2;
            req.session.islogin = crypt.md5(u[0].age + "");
            req.session.user=u[0];
            res.redirect("/index");
        } else {
            res.json({message: "账号密码错误"})
        }
    });

};
exports.addUser = function (req, res, next) {
    console.log('add user !!!!!!');
    var password = req.body.password;
    var name = req.body.username;
    var age = req.body.age;
    user.create({name: name, age: age, password: password}, function (err, results) {
        console.log(results.name);
        if (results.name == name) {
            res.json({message: "增加成功!"});
        }
    });
};

exports.deleteUser = function (req, res, next) {
    console.log('remove user !!!!!!!!');
    var id = req.body.id;
    user.find({id: id}, function (err, u) {
        u[0].remove(function (err) {
            res.json({message: "删除成功!"});
        });
    });
};

exports.getAllUser = function (req, res, next) {
    console.log('get all user !!!!!!!');
    user.find(function (err, users) {
        res.json({users: users});
    });

};
exports.getUserByPage=function(req,res,next){
    var page=req.body.page;
    var size=req.body.size;
    user.find().limit(size).offset(page*size).run(function(err,users){
        res.json({users:users});
    });
};
exports.updateUser = function (req, res, next) {
    console.log('update user !!!!!!!!!!!!');
    var name = req.body.username;
    var id = req.body.id;
    user.find({id: id}, function (err, u) {
        u[0].name = name;
        u[0].save(function (err) {
            res.json({message: "修改成功!"});
        });
    });
};