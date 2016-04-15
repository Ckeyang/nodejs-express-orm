/**
 * Created by Administrator on 2016/4/15.
 */
var Sequelize = require('sequelize');
var sequelize = require('../utils/mysqlUtil.js');
var user = sequelize.define('user', {
    id: {type: Sequelize.BIGINT},
    name: {type: Sequelize.STRING, max: 20},
    age: {type: Sequelize.INT24}
}, {freezeTableName: true, timestamps: false});
user.sync().on('success', function(){
    console.log('aa..');
}).on('failure', function(){
    console.log('bb..');
});