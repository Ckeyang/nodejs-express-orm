/**
 * Created by ckey on 2016/6/1.
 */
var express = require('express');
var router = express.Router();
var jumpController = require('../controllers/jumpController');
var adminController = require('../controllers/adminUserController');
var adminTagController = require('../controllers/adminTagController');
var imageController=require('../controllers/imageController');
/**
 *跳转操作
 */
router.get('/logout', jumpController.logout);
router.get('/', jumpController.login);
router.get('/index', jumpController.index);
router.get('/collocation', jumpController.collocation);
router.get('/material', jumpController.material);
/**
 * AdminUser 操作
 */
router.post('/onlogin.json', adminController.onLogin);
router.post('/addAdminUser.json',adminController.addAdminUser);
/**
 * AdminTag 操作
 */
router.post('/getlevel2tag.json', adminTagController.searchLevel2Tag);
router.post('/deletelevel2tag.json', adminTagController.deleteLevel2Tag);
router.post('/deletelevel1tag.json', adminTagController.deleteLevel1Tag);
router.post('/updatelevel1tag.json', adminTagController.updateLevel1Tag);
router.post('/searchLevel1Tag.json',adminTagController.searchLevel1Tag);
router.post('/addLevel1Tag.json',adminTagController.addLevel1Tag);
router.post('/addLevel2Tag.json',adminTagController.addLevel2Tag);
router.post('/setLevel1bar.json',adminTagController.setLevel1bar);
router.post('/updateLevel1SX.json',adminTagController.updateLevel1SX);
router.post('/uploadTagPics.json',adminTagController.uploadTagPics);
router.post('/enableTag.json',adminTagController.enableTag);
router.post('/getStartTags.json',adminTagController.getStartTags);
router.post('/searchpx.json',adminTagController.searchpx);
/**
 *获取图片
 */
router.get('*.png', imageController.getImage);
router.get('*.jpg', imageController.getImage2);
module.exports = router;