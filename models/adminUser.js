/**
 * Created by Administrator on 2016/4/15.
 * 管理员对象
 */
var table=require('../config/table');
module.exports.createAdminUserModel=function(db){
    var adminUser = db.define(table.adminUserTable, {
        name:String,
        loginname:String,
        password:String,
        fid:String,
        create_time:String,
        lastmodifytime:String
    });
    adminUser.sync(function(err){
        if(err) throw err;
    });
    return adminUser;
};
