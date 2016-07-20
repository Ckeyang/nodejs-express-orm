/**
 * 加密工具类
 */
var crypto = require('crypto');
/**
 * md5加密
 * @param str
 * @returns {*}
 */
var md5 = function (str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
};
/**
 * 二进制加密
 * @param str
 * @param secret
 * @returns {undefined|UpdateQuery|*|Promise.<Array.<affectedCount, affectedRows>>}
 */
var encryptAes = function (str, secret) {
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
};
/**
 * 二进制反编译
 * @param str
 * @param secret
 * @returns {undefined|UpdateQuery|*|Promise.<Array.<affectedCount, affectedRows>>}
 */
var decryptAes = function (str, secret) {
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};
exports.decryptAes = decryptAes;
exports.encryptAes = encryptAes;
exports.md5 = md5;