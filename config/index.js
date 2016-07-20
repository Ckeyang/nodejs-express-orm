/**
 * Created by lance on 2016-06-12.
 */
var path = require('path'); // 通过NODE_ENV来设置环境变量，如果没有指定则默认为生产环境
var fs = require('fs');
var configEnv;

var NODE_ENV = process.env.NODE_ENV;
//没有配置node的环境变量就使用配置文件参数
//配置了环境变量使用环境变量
if (NODE_ENV) {
    //配置了
    configEnv = NODE_ENV.trim();
}
else {
    //没有配置
    var processArgArray = process.argv;
    if (processArgArray.length > 2) {
        configEnv = processArgArray[2];
        console.log("read command  parameter  config env =  " + configEnv);
    }
}

//优先读取环境变量，没有环境变量再读取配置文件

var env = configEnv || 'local';
env = env.toLowerCase(); // 载入配置文件
//'config'+ path.sep +
var file = path.resolve(__dirname, 'config' + env);

if (!fs.existsSync(file + ".js")) {
    file = path.resolve(__dirname, 'configlocal');
}

try {
    var config = module.exports = require(file);
    console.log('Load config: [%s] %s', env, file);
} catch (err) {
    console.error('Cannot load config: [%s] %s', env, file);
    throw err;
}