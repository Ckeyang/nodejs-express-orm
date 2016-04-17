/**
 * Created by Administrator on 2016/4/15.
 */
var db = require('../utils/mysqlUtils');
var userModel = require('../models/user');
var fs=require('fs');
var d = db.conn();
var user = userModel.createUserModel(d);
var BASE_TEMPLATE_DIR ="D://myproject/adminserver_html";
exports.login = function (req, res, next) {
    //����ȥlogin.html
    res.redirect(BASE_TEMPLATE_DIR+"/html/login/login.html")
};

exports.onLogin = function (req, res, next) {
    var password = req.body.password;
    var name = req.body.userName;
    console.log(name, password);
   /* res.setHeader('Access-Control-Allow-Origin', '*');*/
    user.find({name: name,password:password}, function (err, users) {
        if (err) throw err;
        if (users[0]!=null) {
            res.json(users);
        } else {
           res.json({message:"�˺��������"})
        }
    });

};
exports.addUser=function(req,res,next){
    var password = req.body.password;
    var name = req.body.userName;
    user.create({name:name,age:22},function(err,results){
        if (err) throw err;
        if(results.rows){
            res.json({message:"���ӳɹ�!"});
        }
    });
};

exports.deleteUser=function(req,res,next){
    var name = req.body.userName;
    user.find({name:name},function(err,u){
        if(err) throw  err;
        u.remove(function(err){
            if(err) throw err;
            res.json({message:"ɾ���ɹ�!"});
        });
    });
};

exports.updateUser=function(req,res,next){
    var name=req.body.userName;
    var id=req.body.id;
    user.find({id:id},function(err,u){
        u.name=name;
        u.save(function(err){
            if(err) throw err;
            res.json({message:"�޸ĳɹ�!"});
        });
    });
};