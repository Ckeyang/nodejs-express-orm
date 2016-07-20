/**
 * Created by Administrator on 2016/4/27.
 * 推送管理任务工具
 */
var schedule = require('node-schedule');
var pushServer = require('../controllers/adminPushService');
var java = require('../controllers/javaServer');
var mapSchedule = [];
exports.createschedule = function (data) {
    var newSchedule = {};
    console.log(newSchedule);
    newSchedule.id = data.id;
    newSchedule.schedule = schedule.scheduleJob(data.pushtime, function () {
        console.log(data.pushtime + " end push success");
        java.pushSchedule(data);/*此处需要修改，通过传参进来的函数进行操作，不能直接进行操作*/
        pushServer.updatePushItems(data.id);/*此处需要修改，通过传参进来的函数进行操作，不能直接进行操作*/
    });
    mapSchedule.push(newSchedule);
    console.log(mapSchedule.toString());
};
exports.getScheduleNum = function () {
    return schedule.scheduledJobs.job;
};
exports.cancelJob = function (id) {
    mapSchedule.forEach(function (item, i) {
        if (item.id = id) {
            var schedule = item.schedule;
            schedule.cancel();
            mapSchedule.remove(i);
        }
    });
};

Array.prototype.remove = function (dx) {
    if (isNaN(dx) || dx > this.length) {
        return false;
    }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
            this[n++] = this[i]
        }
    }
    this.length -= 1
};