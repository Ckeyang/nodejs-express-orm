/**
 * Created by Administrator on 2016/4/15.
 */
var orm = require('orm');
var config = require('../config/config');
module.exports.conn = function(){
    var db=orm.connect(config.dbbase)
    db.on('connect', function (err) {
        if (err) throw err;
    });
    return db;
};