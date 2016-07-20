/**
 * Created by Administrator on 2016/6/1.
 */
var table=require('../config/table');
module.exports.createAdminTagModel=function(db){
    var adminTag = db.define(table.adminTagTable, {
        pid:{type:'integer'},
        type:{type:'integer'},
        name:String,
        status:{type:'integer'},
        required:{type:'integer'},
        initialflag:{type:'integer'},
        showorder:{type:'integer'},
        image:String,
        isenable:{type:'integer'},
        createtime:String,
        lastmodifytime:String
    });
    adminTag.sync(function(err){
        if(err) throw err;
    });
    return adminTag;
};