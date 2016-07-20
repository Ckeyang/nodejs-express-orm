/**
 * Created by Administrator on 2016/7/19.
 */
var table=require('../config/table');
module.exports.createAdminFuncModel=function(db){
    var adminFunc = db.define(table.adminFuncTable, {
        funcid:{type:'integer'},
        funcname:String,
        funcaddress:String,
        image:String,
        createtime:String,
        lastmodifytime:String
    });
    adminFunc.sync(function(err){
        if(err) throw err;
    });
    return adminFunc;
};
