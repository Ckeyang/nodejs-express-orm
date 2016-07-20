/**
 * Created by Administrator on 2016/7/19.
 */
var db = require('../utils/mysqladmin');
var funcModel = require('../models/adminFunc');
//var fs = require('fs');
var d = db.conn();
var adminfunc = funcModel.createAdminFuncModel(d);
/**
 *
 * @param json
 * @param fn
 */
exports.search = function (json, fn) {
    var data = {};
    /*异步查询数据*/
    adminfunc.find(json, function (err, funclist) {
        if (err) throw err;
        data.funclist=funclist;
        fn(data)
        });
};
