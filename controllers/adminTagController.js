/**
 * Created by ckey on 2016/6/2.
 */
var adminTag = require('../service/adminTagService');
var enable = require('../service/adminEnableService');
var translate = require('../utils/translateData');
var java = require('../utils/javaServer');
var table = require('../config/table');
var config = require('../config/index');
var orm = require('orm');
var util = require('util');
// 移动文件需要使用fs模块
var fs = require('fs');
var path = require('path');
var multiparty = require('multiparty');
/**
 * 查询二级标签
 * @param req
 * @param res
 * @param next
 * by ckey
 */
exports.searchLevel2Tag = function (req, res, next) {
    console.log(" 查询二级标签");
    var id = req.body.id;
    var type = req.body.type;
    adminTag.search({pid: id, type: type, status: 1}, 'showorder', function (data) {
        data.list.forEach(function (item) {
            item.image = config.imageshost + item.image;
        });
        var result = data.list;
        res.json({result: result});
    });
};
/**
 * 查询一级标签
 * @param req
 * @param res
 * @param next
 */
exports.searchLevel1Tag = function (req, res, next) {
    console.log(" 查询一级标签");
    var tag = table.adminTagTable;
    var type = req.body.type;
    var isenable = req.body.isenable;
    var initialflagName = req.body.initialflagName;
    var name = req.body.name;
    var pid = 0;
    adminTag.search({
        pid: pid,
        type: type,
        isenable: isenable,
        initialflag: initialflagName,
        name: orm.like("%" + name + "%"),
        status: 1
    }, '-createtime', function (data) {
        adminTag.doSql("select pid,count(1) cnt from admin_tag where pid > 0 and status=1 group by pid", [], function (count) {
            data.list.forEach(function (item) {
                count.list.forEach(function (jtem) {
                    if (item.id == jtem.pid) {
                        item.cnt = jtem.cnt;
                    }
                })
            });
            enable.search({}, function (da) {
                var lasttime = da.list[0].lasttime;
                data.list.forEach(function (item) {
                    if (item.lastmodifytime > lasttime) {
                        item.isFlash = 1;
                    } else {
                        item.isFlash = 0;
                    }
                });
                res.json({result: data, lasttime: lasttime});
            });
        });
    });
};
/**
 * 删除二级标签
 * @param req
 * @param res
 * @param next
 */
exports.deleteLevel2Tag = function (req, res, next) {
    console.log(" 删除二级标签");
    var ids = req.body.ids;
    adminTag.delete({id: ids}, function (data) {
        res.json({result: data});
    });

};
/**
 * 修改一级标签
 * @param req
 * @param res
 * @param next
 * by ckey
 */
exports.updateLevel1Tag = function (req, res, next) {
    console.log("修改一级标签");
    var id = req.body.id;
    var required = req.body.required;
    var initialflag = req.body.initialflag;
    adminTag.updateLevel1Tag({id: id}, required, initialflag, function (data) {
        res.json({result: data});
    });

};
/**
 * 删除一级标签
 * @param req
 * @param res
 * @param next
 * by ckey
 */
exports.deleteLevel1Tag = function (req, res, next) {
    console.log("删除一级标签");
    var id = req.body.id;
    var superpass = req.body.superpass;
    adminTag.delete({id: id}, function (data) {
        res.json({result: data});
    });
};

/**
 * 新增一级标签
 * @param req
 * @param res
 * @param next
 */
exports.addLevel1Tag = function (req, res, next) {
    console.log("新增一级标签");
    var name = req.body.name;
    var type = req.body.type;
    var required = req.body.required;
    var pid = req.body.pid;
    var length = req.body.length;
    adminTag.create({
        pid: pid,
        name: name,
        type: type,
        status: 1,
        initialflag: 1,
        showorder: length + 1,
        image: '',
        isenable: 1,
        required: required,
        createtime: new Date(),
        lastmodifytime: new Date()
    }, function (data) {
        res.json({result: data});
    });
};

/**
 * 新增二级标签
 * @param req
 * @param res
 * @param next
 */
exports.addLevel2Tag = function (req, res, next) {
    console.log("新增二级标签");
    var data = req.body.data;
    var type = req.body.type;
    var pid = req.body.pid;
    if (type != 2) {
        data.forEach(function (item, value) {
            if (typeof item.id == 'undefined') {
                adminTag.create({
                    pid: pid,
                    type: type,
                    name: item.val,
                    status: 1,
                    initialflag: 1,
                    showorder: data.length + 1,
                    image: '',
                    isenable: 1,
                    required: 1,
                    createtime: new Date(),
                    lastmodifytime: new Date()
                }, function (data) {
                    if (data.length == value) {
                        res.json({result: data});
                    }
                });
            }
        });
    } else {
        data.forEach(function (item, value) {
            if (typeof item.id == 'undefined') {
                adminTag.create({
                    pid: pid,
                    type: type,
                    name: item.name,
                    status: 1,
                    initialflag: 1,
                    showorder: data.length + 1,
                    image: item.val,
                    isenable: 1,
                    required: 1,
                    createtime: new Date(),
                    lastmodifytime: new Date()
                }, function (data) {
                    if (data.length == value) {
                        res.json({result: data});
                    }
                });
            }
        });
    }
};

/**
 * setlevel1 接口
 * @param req
 * @param res
 * @param next
 */
exports.setLevel1bar = function (req, res, next) {
    console.log("setlevel1 接口");
    var uploadDir = path.resolve('.') + path.sep + "upload" + path.sep + "tmp" + path.sep;
    var form = new multiparty.Form({uploadDir: uploadDir});
    //上传完成后处理
    var result = [];
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);
        if (err) {
            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + files);
            var level1 = JSON.parse(fields.level1[0]);
            var level2 = JSON.parse(fields.level2[0]);
            var newlevel2 = JSON.parse(fields.newlevel2[0]);
            console.log(level1, level2, newlevel2);
            var type = newlevel2.type;
            if (type == 2) {

                for (var key in files) {
                    console.log("获取files:----------------" + files[key].toString());
                    files[key].forEach(function (inputFile) {
                        console.log("inputFile:----------------" + inputFile);
                        var uploadedPath = inputFile.path;
                        var originalFilename = inputFile.originalFilename;
                        var positionOfFileExt = originalFilename.lastIndexOf('.');
                        var extension = "";
                        if (positionOfFileExt > 0) {
                            extension = originalFilename.substring(positionOfFileExt);
                        }
                        var savePath = '/upload/tags/' + new Date().getTime() + Math.round(Math.random() * 100) + extension;
                        var dstPath = '.' + savePath;
                        var obj = {};
                        obj.dstPath = savePath;
                        obj.originalFilename = originalFilename;
                        result.push(obj);
                        //重命名为真实文件名
                        fs.rename(uploadedPath, dstPath, function (err) {
                            if (err) {
                                console.log('rename error: ' + err);
                            } else {
                                console.log('rename ok');
                            }
                        });
                    });

                }
            }
            var id = level1.id;
            var required = level1.required;
            var initialflag = level1.initialflag;
            adminTag.updateLevel1Tag({id: id}, required, initialflag, function (data1) {
                var ids = level2.ids;
                ids = ids.split(',');
                adminTag.search({pid: id}, '-createtime', function (data5) {
                    var tags = data5.list;
                    var data = newlevel2.data;
                    console.log(data);
                    if (data.length != 0) {
                        tags.forEach(function (item) {
                            data.forEach(function (jtem) {
                                if (item.id == jtem.id && item.showorder != jtem.showorder) {
                                    item.showorder = jtem.showorder;
                                    item.save();
                                }
                            });
                        });
                    }
                    if (type == 1 || type == 2 || type == 4) {
                        adminTag.updateLevel2Tag({pid: id}, required, initialflag, function (data2) {
                            adminTag.delete({id: ids}, function (data3) {
                                var type = newlevel2.type;
                                var pid = newlevel2.pid;
                                var da = [];

                                if (type != 2) {
                                    if (data.length != 0) {
                                        data.forEach(function (item, value) {
                                            if (typeof item.id == 'undefined') {
                                                adminTag.create({
                                                    pid: pid,
                                                    type: type,
                                                    name: item.val,
                                                    status: 1,
                                                    initialflag: initialflag,
                                                    showorder: item.showorder,
                                                    image: '',
                                                    isenable: 1,
                                                    required: required,
                                                    createtime: new Date(),
                                                    lastmodifytime: new Date()
                                                }, function (data3) {
                                                    da.push(data3);
                                                    if (data.length == value + 1) {
                                                        res.json({level1: data1 + data2, level2: data3, newlevel2: da});
                                                    }
                                                });
                                            } else {
                                                if (data.length == value + 1) {
                                                    res.json({level1: data1 + data2, level2: data3, newlevel2: null});
                                                }
                                            }

                                        });
                                    }else{
                                        res.json({result: {code: 0}});
                                    }

                                } else {
                                    if (data.length != 0) {
                                        data.forEach(function (item, value) {
                                            if (typeof item.id == 'undefined') {
                                                var imageName = item.image.split(/\\/g)[item.image.split(/\\/g).length - 1];
                                                console.log(imageName);
                                                result.forEach(function (jtem) {
                                                    if (imageName == jtem.originalFilename) {
                                                        console.log(jtem.dstPath);
                                                        item.image = jtem.dstPath;
                                                    }
                                                });
                                                adminTag.create({
                                                    pid: pid,
                                                    type: type,
                                                    name: item.name,
                                                    status: 1,
                                                    initialflag: 1,
                                                    showorder: item.showorder,
                                                    image: item.image,
                                                    isenable: 1,
                                                    required: 1,
                                                    createtime: new Date(),
                                                    lastmodifytime: new Date()
                                                }, function (data3) {
                                                    da.push(data3);
                                                    if (data.length == value + 1) {
                                                        res.json({level1: data1, level2: data2, newlevel2: da});
                                                    }
                                                });
                                            } else {
                                                if (data.length == value + 1) {
                                                    res.json({level1: data1, level2: data2, newlevel2: null});
                                                }
                                            }
                                        });
                                    }else{
                                        res.json({result: {code: 0}});
                                    }
                                }

                            });
                        });
                    } else {
                        res.json({result: {code: 0}});
                    }
                });
            });
        }
    });
};


/**
 * 上传标签图片
 * @param req
 * @param res
 * @param next
 */
exports.uploadTagPics = function (req, res, next) {
    console.log("上传标签图片");
    //生成multiparty对象，并配置上传目标路径
    var uploadDir = path.resolve('.') + path.sep + "upload" + path.sep + "tmp" + path.sep;
    var form = new multiparty.Form({uploadDir: uploadDir});
    //上传完成后处理
    var result = [];
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);
        var fieldsTmp = JSON.stringify(fields, null, 2);
        if (err) {
            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + files);

            for (var key in files) {
                //  for (var inputFile in files[key]) {
                // var inputFile = files[key][0];
                files[key].forEach(function (inputFile) {
                    var uploadedPath = inputFile.path;
                    var originalFilename = inputFile.originalFilename;
                    var positionOfFileExt = originalFilename.lastIndexOf('.');
                    var extension = "";
                    if (positionOfFileExt > 0) {
                        extension = originalFilename.substring(positionOfFileExt);
                    }
                    var dstPath = './upload/tags/' + new Date().getTime() + extension;
                    var obj = {};
                    obj.dstPath = dstPath;
                    obj.originalFilename = originalFilename;
                    result.push(obj);
                    //重命名为真实文件名
                    fs.rename(uploadedPath, dstPath, function (err) {
                        if (err) {
                            console.log('rename error: ' + err);
                        } else {
                            console.log('rename ok');
                        }
                    });
                });

            }
            res.json({result: result});
        }
    });
};

/**
 * 修改一级标签顺序
 * @param req
 * @param res
 * @param next
 */
exports.updateLevel1SX = function (req, res, next) {
    console.log("修改一级标签顺序");
    var ids = req.body.ids;
    adminTag.search({id: ids}, '-createtime', function (data) {
        var da = [];
        data.list.forEach(function (i, val) {
            ids.forEach(function (j, value) {
                if (i.id == j) {
                    i.showorder = value + 1;
                    i.save(function (err, result) {
                        da.push(result);
                        if (data.list.length == val + 1) {
                            res.json({result: da});
                        }
                    });
                }
            });
        });
    });
};
/**
 * 获取修改标签个数
 * @param req
 * @param res
 * @param next
 */
exports.getStartTags = function (req, res, next) {
    console.log("获取修改标签个数");
    var ids = req.body.ids;
    adminTag.search({id: ids}, '-createtime', function (data1) {
        enable.search({}, function (data2) {
            var cnt = 0;
            var lasttime = data2.list[0].lasttime;
            data1.list.forEach(function (item) {
                var lastmodifytime = item.lastmodifytime;
                if (lastmodifytime > lasttime) {
                    cnt++;
                }
            });
            res.json({result: cnt});
        })
    });
};
/**
 * 启用操作
 * @param req
 * @param res
 * @param next
 */
exports.enableTag = function (req, res, next) {
    console.log("启用操作");
    var ids = req.body.ids;
    var user = req.session.user;
    var superpass = req.body.superpass;
    try {
        if (superpass == config.superpass) {
            adminTag.updateEnable({id: ids}, function (data1) {
                console.log(data1);
                if (data1.code == 0) {
                    adminTag.updateEnable({pid: ids}, function (data2) {
                        if (data2.code == 0) {
                            var sql = "SELECT isenable,image,name,pid,id,type,initialflag,required,status,showorder FROM " + table.adminTagTable;
                            adminTag.doSql(sql, [], function (data) {
                                data.list.forEach(function (item) {
                                    if (item.type == 2 && item.pid != 0) {
                                        item.image = config.imageshost + item.image;
                                    }
                                });
                                var post_data=JSON.stringify(data.list);
                                java.pushTags({tags: post_data},'/appserver/updateTagList.json', function (body) {
                                    var result = JSON.parse(body);
                                    console.log(result);
                                    if (result.code == 0) {
                                        enable.create({
                                            execid: user.id,
                                            createtime: new Date(),
                                            lasttime: new Date()
                                        }, function (data) {
                                            res.json({result: result});
                                        })
                                    } else {
                                        res.json({result: result});
                                    }
                                })
                            })
                        } else {
                            res.json({result: {code: -1}});
                        }
                    });
                } else {
                    res.json({result: {code: -1}});
                }
            });
        } else {
            res.json({result: {code: -1}});
        }
    } catch (e) {
        throw e
    }
};
/**
 * 排序查询
 * @param req
 * @param res
 * @param next
 */
exports.searchpx = function (req, res, next) {
    var params = req.body.params;
    var ids = [];
    adminTag.search({name: orm.like("%" + params + "%"), status: 1, pid: 0}, '-createtime', function (data) {
        data.list.forEach(function (item) {
            ids.push(item.id);
        });
        res.json({result: ids});
    });
};