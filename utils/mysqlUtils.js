/**
 * Created by Administrator on 2016/4/15.
 */
var Sequelize=require('sequelize');
var config=require('../config/config.js');
var sequelize=new Sequelize(config.database,config.user,config.password,{host:config.host,port:config.dbport,dialect:config.db});

exports.sequelize=sequelize;