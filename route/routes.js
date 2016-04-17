/**
 * Created by Administrator on 2016/4/15.
 */
var express=require('express');
var router=express.Router();
var userService=require('../controllers/userservice');
router.get('/',function(req,res,next){
    //res.end("hallo world");
    userService.login(req,res,next);
});
router.post('/onlogin',function(req,res,next){
    userService.onLogin(req,res,next);
});
router.post('/addUser',function(req,res,next){
    userService.addUser(req,res,next);
});
router.post("/deleteUser",function(req,res,next){
    userService.deleteUser(req,res,next);
});
router.post("/updateUser",function(req,res,next){
    userService.updateUser(req,res,next);
});
module.exports = router;