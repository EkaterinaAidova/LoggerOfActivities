"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const timer_1 = require('../models/timer');
let TimerPipe = class TimerPipe {
    transform(log, args) {
        if (log.Status == 1) {
            if (args != undefined)
                return args.time;
            let timer = new timer_1.Timer();
            if (log.SpendingTime != null)
                timer.startTime = log.SpendingTime.valueOf();
            timer.Start();
            return timer.time;
        }
        if (log.SpendingTime == null)
            return '';
        let result;
        result = log.SpendingTime.getDate + "/" + log.SpendingTime.getMonth + "/" + log.SpendingTime.getFullYear + " " + log.SpendingTime.getHours + ":" + log.SpendingTime.getMinutes;
        return result;
    }
};
TimerPipe = __decorate([
    core_1.Pipe({
        name: 'timer',
        pure: false
    }), 
    __metadata('design:paramtypes', [])
], TimerPipe);
exports.TimerPipe = TimerPipe;
//# sourceMappingURL=timer.pipe.js.map