/**
 * Created by Administrator on 2016/4/15.
 */
var express=require('express');
var router=express.Router();
router.get('/',function(req,res,next){
    //res.end("hallo world");
    console.log("hallo  world");
});
module.exports = router;