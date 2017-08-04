"use strict";
const timer_1 = require('./timer');
const moment = require('moment');
class ActiveLog {
    constructor() {
        this.isEnable = false;
        this.timer = new timer_1.Timer();
    }
    setLog(log) {
        if (log.Status !== 1) {
            this.isEnable = false;
            return;
        }
        if (!this.isEnable || !this.checkLogOnActive(log.TaskID)) {
            this.id = log.TaskID;
            this.isEnable = true;
            this.timer.setStartTime(this.calculateStartPoint(log));
            this.timer.start();
        }
    }
    calculateStartPoint(log) {
        let spendingTime = 0;
        let betweenResumeAndNow = 0;
        let lastResume = moment(log.LastResumeTime).toDate().valueOf();
        if (log.LastResumeTime != null) {
            betweenResumeAndNow = (moment().toDate().valueOf() - lastResume) * 10000;
        }
        if (log.SpendingTime != null) {
            spendingTime = log.SpendingTime;
        }
        let duration = spendingTime + betweenResumeAndNow;
        return duration;
    }
    checkLogOnActive(id) {
        if (id == this.id)
            return true;
        return false;
    }
    onPause() {
        this.isEnable = false;
        console.log(this.id);
        return this.id;
    }
}
exports.ActiveLog = ActiveLog;
//# sourceMappingURL=active-log.model.js.map