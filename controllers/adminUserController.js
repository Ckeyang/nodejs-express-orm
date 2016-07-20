/**
 * Created by ckey on 2016/6/1.
 */
var adminUserService = require('../service/adminUserService');
var adminFuncService = require('../service/adminFuncService');
var crypt = require('../utils/crypt');
/**
 * 登录
 * @param req
 * @param res
 * @param next
 */
exports.onLogin = function (req, res, next) {
    var password = req.body.password;
    var loginname = req.body.loginname;
    password = crypt.md5(password);
    adminUserService.search({loginname: loginname, password: password}, function (data) {
        var u = data.users;
        if (u != '') {
            req.session.isfirst = 2;
            req.session.islogin = crypt.md5(u[0].name + "");
            var user = {
                id: u[0].id,
                name: u[0].name,
                token: crypt.md5(u[0].name + "")
            };
            var fids=u[0].fid.split(',');
            adminFuncService.search({id:fids},function(data){
                data.funclist.forEach(function(item){
                    console.log("功能有:"+item.funcname);
                });
                user.funclist= data.funclist;
                req.session.user = user;
                /*跳转*/
                res.redirect("/index");
            });

        } else {
            res.redirect("/");
        }
    });
};

exports.addAdminUser = function (req, res, next) {
    var loginname = req.body.loginname;
    var password = req.body.password;
    var name = req.body.name;
    password = crypt.md5(password);
    adminUserService.searchOne({loginname: loginname}, function (data) {
        if (data) {
            adminUserService.create({
                loginname: loginname,
                password: password,
                name: name,
                create_time: new Date(),
                lastmodifytime: new Date()
            }, function (d) {
                res.json({result: d});
            });
        } else {
            res.json({code: -1, message: '用户已存在'});
        }
    });
};