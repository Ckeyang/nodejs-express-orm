/**
 * Created by ckey on 2016/6/1.
 * 管理员服务
 */
var db = require('../utils/mysqladmin');
var userModel = require('../models/adminUser');
//var fs = require('fs');
var d = db.conn();
var adminUser = userModel.createAdminUserModel(d);
/**
 *
 * @param json
 * @param fn
 */
exports.search = function (json, fn) {
    var data = {};
    /*异步查询数据*/
    adminUser.find(json, function (err, u) {
        if (err) throw err;
        data.users = u;
        if (typeof u[0] != 'undefined') {
            u[0].lastmodifytime = new Date();
            u[0].save(function (err) {
                if (err) throw err;
                fn(data);
            });
        }else{
            fn(data);
        }
    });
};

exports.create = function (json, fn) {
    var data = {};
    adminUser.create(json, function (err, result) {
        if (err) {
            data.code = -1;
            fn(data);
        } else {
            data.code = 0;
            fn(data);
        }
    });
};

exports.searchOne = function (json, fn) {
    var data = false;
    adminUser.find(json, function (err, u) {
        if (err) throw err;
        if (u[0] == null) {
            data = true
        }
        fn(data);
    });
};