/**
 * Created by Administrator on 2016/6/15.
 */
var db = require('../utils/mysqladmin');
var enableModel = require('../models/adminEnable');
//var fs = require('fs');
var d = db.conn();
var enable = enableModel.createAdminEnableModel(d);

exports.search = function (json, fn) {
    var data = {};
    enable.find(json).order('-id').run(function (err, results) {
        if (err) throw err;
        data.list = results;
        fn(data);
    });
};

exports.create = function (json, fn) {
    var data = {};
    enable.create(json, function (err, results) {
        if (err) {
            data.code = -1;
            throw err
        } else {
            data.code = 0;
        }
        fn(data);
    })
};