/**
 * Created by Administrator on 2016/6/1.
 */
var db = require('../utils/mysqladmin');
var tagModel = require('../models/adminTag');
//var fs = require('fs');
var d = db.conn();
var adminTag = tagModel.createAdminTagModel(d);

/**
 * 直接写sql
 You can escape identifiers and values.// For identifier substitution use: ??// For value substitution use: ?
 db.driver.execQuery(
 "SELECT user.??, user.?? FROM user WHERE user.?? LIKE ? AND user.?? > ?",
 ['id', 'name', 'name', 'john', 'id', 55],
 function (err, data) { ... }
 )
 * @param sql
 * @param params
 * @param fn
 */
exports.doSql = function (sql, params, fn) {
    var data = {};
    d.driver.execQuery(sql, params, function (err, results) {
        if (err) throw err;
        data.list = results;
        fn(data);
    });
};
/**
 * 查询
 * @param json
 * @param fn 回调函数
 */
exports.search = function (json,order, fn) {
    var data = {};
    /*异步查询数据*/
    adminTag.find(json).order(order).run(function (err, results) {
        if (err) throw err;
        data.list = results;
        fn(data);
    });
};
/**
 * 删除
 * @param json
 * @param fn 回调函数
 */
exports.delete = function (json, fn) {
    var data = {};
    adminTag.find(json).run(function (err, results) {
        if (err) {
            data.code = -1;
            throw  err;
        } else {
            data.code = 0;

            results.forEach(function (item) {
                item.status = 2;
                item.lastmodifytime = new Date();
                item.save(function (err, result) {
                    if (err) {
                        data.error = +1;
                        data.errordate = result[0];
                        throw err;
                    } else {
                        data.success = +1;
                    }
                });
            });
        }
        fn(data);
    });
};
/**
 * 创建
 * @param json
 * @param fn 回调函数
 */
exports.create = function (json, fn) {
    var data = {};
    adminTag.create(json, function (err, results) {
        if (err) {
            data.code = -1;
            throw err
        } else {
            data.code = 0;
        }
        fn(data);
    });
};
/**
 * 修改
 * @param json
 * @param required
 * @param initialflag
 * @param fn 回调函数
 */
exports.updateLevel1Tag = function (json, required, initialflag, fn) {
    var data = {};
    adminTag.find(json).run(function (err, results) {

        results[0].required = parseInt(required);
        results[0].initialflag = parseInt(initialflag);
        results[0].lastmodifytime = new Date();
        results[0].save(function (err) {
            if (err) {
                data.code = -1;
                throw err;
            } else {
                data.code = 0;
            }
        });
    });
    fn(data);
};
exports.updateEnable = function (json, fn) {
    var data = {};
    adminTag.find(json).run(function (err, results) {
        if (err) throw err;
        results.forEach(function (item) {
            item.isenable = 2;
            item.save(function (err, resulte) {
                if (err) throw err;
                var o = {};
                o.code = 0;
                data = o;
            });
        });
        fn(data);
    })
};
exports.updateLevel2Tag = function (json, required, initialflag, fn) {
    var data = {};
    adminTag.find(json).run(function (err, results) {
        results.forEach(function (item) {
            item.required = parseInt(required);
            item.initialflag = parseInt(initialflag);
            item.lastmodifytime = new Date();
            item.save(function (err) {
                if (err) {
                    data.code = -1;
                    throw err;
                } else {
                    data.code = 0;
                }
            });
        });
        fn(data);
    });
};