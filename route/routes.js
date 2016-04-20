/**
 * Created by Administrator on 2016/4/15.
 */
var express = require('express');
var router = express.Router();
var userService = require('../controllers/userservice');
/**
 * Ĭ�ϵ�ַ
 */
router.get('/', function (req, res, next) {
    userService.login(req, res, next);
});
/**
 * ��½
 */
router.post('/onlogin.json', function (req, res, next) {
    userService.onLogin(req, res, next);
});

router.get('/index',function(req,res,next){
    var user=req.session.user;
    res.render('index.html',{user:user,message:'localhost:1234'});
});
/**
 * ����û�
 */
router.post('/addUser', function (req, res, next) {
    userService.addUser(req, res, next);
});
/**
 * ��ȡȫ���û�
 */
router.post('/getAllUser.json', function (req, res, next) {
    userService.getAllUser(req, res, next);
});

router.post('/getUserByPage.json',function(req,res,next){
    userService.getUserByPage(req,res,next);
});
/**
 * ɾ���û�
 */
router.post("/deleteUser", function (req, res, next) {
    userService.deleteUser(req, res, next);
});
/**
 * �޸��û���Ϣ
 */
router.post("/updateUser", function (req, res, next) {
    userService.updateUser(req, res, next);
});

module.exports = router;