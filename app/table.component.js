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
const core_2 = require('@angular/core');
const time_log_service_1 = require('./services/time-log.service');
const user_service_1 = require('./services/user.service');
let EmptyDatePipe = class EmptyDatePipe {
    transform(date, args) {
        if (date == null)
            return "";
        let result;
        result = date.getDate + "/" + date.getMonth + "/" + date.getFullYear + " " + date.getHours + ":" + date.getMinutes;
        return result;
    }
};
EmptyDatePipe = __decorate([
    core_2.Pipe({
        name: 'emptyDate'
    }), 
    __metadata('design:paramtypes', [])
], EmptyDatePipe);
exports.EmptyDatePipe = EmptyDatePipe;
class User {
}
exports.User = User;
class Project {
}
exports.Project = Project;
class Activity {
}
exports.Activity = Activity;
class TimeLog {
}
exports.TimeLog = TimeLog;
let TableComponent = class TableComponent {
    constructor(_userService, _timeLogService) {
        this._userService = _userService;
        this._timeLogService = _timeLogService;
        this.user = new User();
        this.logined = false;
        this.timeLogs = [];
    }
    GetTimeLogs() {
        this._timeLogService.getData(this.user.ID).subscribe(logs => {
            this.timeLogs = logs;
        }, error => {
            console.log(error);
        });
    }
    OnChanged(id) {
        this.user.ID = id;
        console.log(id);
        this.logined = true;
        this._userService.get('api/user/', this.user.ID).subscribe(user => {
            this.user = user;
            this.GetTimeLogs();
            /*  this.timeLogs = this._timeLogService.getData(user.ID).subscribe(logs => {
                  this.timeLogs = logs;
              },
          error =>
          {
              console.log(error);
          });*/
        }, error => {
            console.log(error);
        });
    }
    Exit() {
        this.user.Name = "";
        this.logined = false;
    }
};
TableComponent = __decorate([
    core_1.Component({
        selector: 'table-logs',
        template: `<div class="userPanel" *ngIf="logined"> Сотрудник: {{user.Name}}        
                    <button class="btn btn-default" (click)="Exit()">Выйти</button>
               <table class="table table-striped">
                   <thead>
                       <tr>
                          <th>Проект</th>
                          <th>Позиция</th>
                          <th>Время начала</th>
                          <th>Потраченное время</th>
                          <th>Время завершения</th>
                          <th></th>
                          <th></th>
                          <th></th>
                      </tr>
					  </thead>
					  <tr *ngFor="let timeLog of timeLogs">
					  <td> {{timeLog.Project.Name}} </td>
					  <td> {{timeLog.Activity.Position}} </td>
					  <td >{{timeLog.StartWorkTime | date:"dd/MM/yyyy hh:mm"}} </td>
					  <td>	{{timeLog.SpendingTime | emptyDate }} </td>
					  <td>  {{timeLog.EndWorkTime | emptyDate }} </td>
					  <td> <button class="btn btn-default" [disabled]=" timeLog.Status == 1 || timeLog.Status == 3" (click)="Start(timeLog)">Start</button></td>
					  <td> <button class="btn btn-default" [disabled]=" timeLog.Status == 2 || timeLog.Status == 3" (click)="Pause(timeLog)">Pause</button></td>
					  <td> <button class="btn btn-default" [disabled]=" timeLog.Status == 3" (click)="Start(timeLog)">Stop</button></td>
					  </tr>
               </table> 
			   </div> <login *ngIf="!logined" (changedID)="OnChanged($event)"> </login>`
    }), 
    __metadata('design:paramtypes', [user_service_1.UserService, time_log_service_1.TimeLogService])
], TableComponent);
exports.TableComponent = TableComponent;
//# sourceMappingURL=table.component.js.map