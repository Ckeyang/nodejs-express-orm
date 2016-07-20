/**
 * Created by ckey on 2016/6/15.
 */
var table=require('../config/table');
module.exports.createAdminEnableModel=function(db){
    var adminEnable = db.define(table.adminEnableTable, {
        execid:{type:'integer'},
        createtime:String,
        lasttime:String
    });
    adminEnable.sync(function(err){
        if(err) throw err;
    });
    return adminEnable;
};