/**
 * Created by Administrator on 2016/4/15.
 */
var config = require('../config');

exports.login=function(req,res,next){
    //res.render("login.html",{message:""});
    res.end("hello world");
};

exports.onLogin=function(req,res,next){
    var password=req.body.password;
    var name=req.body.name;

}