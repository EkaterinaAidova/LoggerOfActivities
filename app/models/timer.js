"use strict";
const TimerObservable_1 = require("rxjs/Observable/TimerObservable");
class Timer {
    constructor() {
        this.startTime = 1000;
    }
    setStartTime(date) {
        if (date != null) {
            this.startTime = date;
        }
        else {
            this.startTime = 0;
        }
    }
    start() {
        TimerObservable_1.TimerObservable.create(0, 60000)
            .subscribe(t => {
            this.time = this.startTime + t * 60000 * 10000;
        });
    }
}
exports.Timer = Timer;
//# sourceMappingURL=timer.js.map