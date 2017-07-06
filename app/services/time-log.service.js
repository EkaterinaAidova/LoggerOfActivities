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
const http_1 = require('@angular/http');
const Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
let TimeLogService = class TimeLogService {
    constructor(http) {
        this.http = http;
        this.url = "api/timeLog";
    }
    GetData(id) {
        return this.http.get(this.url + "/" + id)
            .map((resp) => {
            let logList = resp.json();
            console.log(logList);
            let logs = [];
            for (let index in logList) {
                let log = logList[index];
                console.log(logList[index]);
                logs.push({
                    TaskID: log.TaskID,
                    UserID: log.UserID,
                    Project: log.Project,
                    Activity: log.Activity,
                    Status: log.Status,
                    StartWorkTime: log.StartWorkTime,
                    LastPauseTime: log.LastPauseTime,
                    LastResumeTime: log.LastResumeTime,
                    EndWorkTime: log.EndWorkTime,
                    SpendingTime: log.SpendingTime });
            }
            return logs;
        }).catch((error) => { return Observable_1.Observable.throw(error); });
    }
    SetStatus(id, status) {
        let data = new PutTime();
        data.logId = id;
        data.status = status;
        data.time = new Date();
        let headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.url + "/", JSON.stringify(data), { headers: headers }).catch((error) => { return Observable_1.Observable.throw(error); });
    }
};
TimeLogService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], TimeLogService);
exports.TimeLogService = TimeLogService;
class PutTime {
}
exports.PutTime = PutTime;
//# sourceMappingURL=time-log.service.js.map