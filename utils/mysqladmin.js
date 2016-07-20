/**
 * Created by Administrator on 2016/4/28.
 * admin数据库连接工具
 */
var orm = require('orm');
var config = require('../config');
module.exports.conn = function(){
    var db=orm.connect(config.dbadminbase);//此处更改环境时要变
    db.on('connect', function (err) {
        if (err) throw err;
    });
    return db;
};
