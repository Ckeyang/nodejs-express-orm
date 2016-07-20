/**
 * Created by Administrator on 2016/6/16.
 */
var fs=require('fs');
var config=require('../config/index');
exports.getImage=function(req,res,next){
    var imgURL = req.url;
    fs.readFile(config.root+"/../"+imgURL, "binary", function(err, file) {
        if(err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.write(err + "\n");
            res.end();
        } else {
            res.writeHead(200, {"Content-Type": "image/png"});
            res.write(file, "binary");
            res.end();
        }
    });
};exports.getImage2=function(req,res,next){
    var imgURL = req.url;
    fs.readFile(config.root+"/../"+imgURL, "binary", function(err, file) {
        if(err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.write(err + "\n");
            res.end();
        } else {
            res.writeHead(200, {"Content-Type": "image/jpg"});
            res.write(file, "binary");
            res.end();
        }
    });
};