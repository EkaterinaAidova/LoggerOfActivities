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
const time_log_service_1 = require('./services/time-log.service');
const user_service_1 = require('./services/user.service');
const pager_service_1 = require('./services/pager.service');
const user_model_1 = require('./models/user.model');
const timer_1 = require('./models/timer');
const activity_service_1 = require('./services/activity.service');
const project_service_1 = require('./services/project.service');
const time_log_create_model_1 = require('./models/time-log-create.model');
let TableComponent = class TableComponent {
    constructor(userService, timeLogService, projectService, activityService, pagerService) {
        this.userService = userService;
        this.timeLogService = timeLogService;
        this.projectService = projectService;
        this.activityService = activityService;
        this.pagerService = pagerService;
        this.user = new user_model_1.User();
        this.logined = false;
        this.timeLogs = [];
        this.projects = [];
        this.activities = [];
        this.timer = new timer_1.Timer();
        this.newLog = new time_log_create_model_1.TimeLogInfoForCreating();
        this.pager = {};
    }
    GetTimeLogs() {
        this.timeLogService.GetData(this.user.ID).subscribe(logs => {
            this.timeLogs = logs;
            if (this.timeLogs[0].Status == 1) {
                this.timer.startTime = this.timeLogs[0].SpendingTime;
                this.timer.Start();
            }
            // get pager object from service
            this.pager = this.pagerService.getPager(this.timeLogs.length, this.pager.currentPage);
            // get current page of items
            this.pagedItems = this.timeLogs.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }, error => {
            console.log(error);
        });
    }
    OnChanged(id) {
        this.user.ID = id;
        console.log(id);
        this.logined = true;
        this.userService.Get(this.user.ID).subscribe(user => {
            this.user = user;
            this.GetTimeLogs();
        }, error => {
            console.log(error);
        });
    }
    Exit() {
        this.user.Name = "";
        this.logined = false;
    }
    Start(timeLog) {
        this.timeLogService.SetStatus(timeLog.TaskID, 1).subscribe((response) => { console.log(response); });
        this.GetTimeLogs();
    }
    Stop(timeLog) {
        this.timeLogService.SetStatus(timeLog.TaskID, 3).subscribe((response) => { console.log(response); });
        this.GetTimeLogs();
    }
    Pause(timeLog) {
        this.timeLogService.SetStatus(timeLog.TaskID, 2).subscribe((response) => { console.log(response); });
        this.GetTimeLogs();
    }
    ngOnInit() {
        this.activityService.Get().subscribe(data => this.activities = data, error => console.log(error));
        this.projectService.Get().subscribe(data => this.projects = data, error => console.log(error));
    }
    onSelectProject(project) {
        this.newLog.ProjectID = project.ID;
    }
    onSelectActivity(activity) {
        this.newLog.ActivityID = activity.ID;
    }
    OnCloseModal(ok) {
        if (ok == true) {
            this.newLog.UserID = this.user.ID;
            this.timeLogService.CreateTimeLog(this.newLog).subscribe((response) => { console.log(response); });
            this.GetTimeLogs();
        }
    }
    setPage(page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.timeLogs.length, page);
        // get current page of items
        this.pagedItems = this.timeLogs.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
};
TableComponent = __decorate([
    core_1.Component({
        selector: 'table-logs',
        templateUrl: './app/html/table.component.html'
    }), 
    __metadata('design:paramtypes', [user_service_1.UserService, time_log_service_1.TimeLogService, project_service_1.ProjectService, activity_service_1.ActivityService, pager_service_1.PagerService])
], TableComponent);
exports.TableComponent = TableComponent;
//# sourceMappingURL=table.component.js.map