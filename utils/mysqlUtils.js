/**
 * Created by Administrator on 2016/4/15.
 */
var orm = require("orm");
//DB config
var opts = {
    database: "spore",
    protocol: "mysql",
    host: "127.0.0.1",
    username: "root",
    password: "123456",
    query: {
        pool: true
    }
}
orm.connect(opts, function (err, db) {
    if (err) throw err;

    //define a table object
    var User = db.define("person", {
        id: Number,
        name: String,
        age: Number
    });
    User.find({name: 'ckey'}, function (err, User) {
        console.log("User found: ", User.length);
        console.log("User name: ", User[0].name);
        console.log("User age : ", User[0].age);
    });
    //insert data
    /*User.create(
     [{name:'Jane',age:18}],function(err,items)
     {
     console.log("insert successfully!")
     console.log(items[0].id);
     })*/
//search data
    /*
     //update data
     User[1].age=19
     User[1].save(function (err) {
     // err.msg = "under-age";
     console.log("update successfully!");
     });*/

    /*
     //delete data
     User[0].remove(function(err){
     console.log("delete successfully!")
     })*/
});