/**
 * Created by Administrator on 2016/5/6.
 * 调用java接口的服务
 */
var http = require('http');
var qs = require('querystring');
var config = require('../config/index');
var request = require('request');
/**
 * 推送接口 data 为数据  jk 接口地址  fn回调函数
 * @param data
 * @param jk
 * @param fn
 */
exports.pushTags = function (data,jk, fn) {
    
    console.log("http://"+config.hostname+jk);
    request.post("http://"+config.hostname+jk,{form:data
    },function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var info=JSON.parse(body);
            console.log("statusCode: "+response.statusCode);
            console.log('BoDy:' + body);
            fn(body);
        }else{
            fn('{"code":-2}');
        }
    });
};