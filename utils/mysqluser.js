/**
 * Created by Administrator on 2016/4/15.
 * user数据库连接工具
 */
var orm = require('orm');
var config = require('../config/config/config');
module.exports.conn = function(){
    var db=orm.connect(config.dbuserbase);//此处更改环境时要变
    db.on('connect', function (err) {
        if (err) throw err;
    });
    return db;
};
