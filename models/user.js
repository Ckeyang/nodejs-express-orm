/**
 * Created by Administrator on 2016/4/15.
 */
module.exports.createUserModel=function(db){
    var user = db.define('user', {
        name:String,
        age:Number,
        password:String
    }, {method:{
        toString:function(){
            return this.name+' '+this.age+' '+this.password;
        }
    }});
    user.sync(function(err){
        if(err) throw err;
    });
    return user;
};
