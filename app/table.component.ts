import { Component, Input} from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { TimeLogService } from './services/time-log.service'
import { UserService } from './services/user.service';
@Pipe({
    name: 'emptyDate'
})
export class EmptyDatePipe implements PipeTransform {
  transform(date: Date, args?: any): string {

      if (date == null  )return "";
      let result: string;
    result = date.getDate + "/" + date.getMonth + "/" + date.getFullYear + " " + date.getHours + ":" + date.getMinutes;
	return result;
  }
}
export class User
{
    ID: number;
    Name: string; 
}
export class Project
{
	ID: number;
	Name: string; 
}
export class Activity
{
	ID: number;
	Position: string; 
}
export class TimeLog
{
TaskID: number;
UserID: number;
Project: Project;
Activity: Activity;
Status: number;
StartWorkTime: Date;
LastPauseTime: Date;
LastResumeTime: Date;
EndWorkTime: Date;
SpendingTime: Date;
}
@Component(
    {
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
    })
export class TableComponent 
{
	constructor(private _userService: UserService, private _timeLogService: TimeLogService) { }
    user: User = new User();
	logined: boolean = false;
	timeLogs: TimeLog[]=[];
    emptpyBlock: any;
    GetTimeLogs() {
        this._timeLogService.getData(this.user.ID).subscribe(logs => {
            this.timeLogs = logs;
        },
            error => {
                console.log(error);
            });
    }
    OnChanged(id)
    {
        this.user.ID = <number>id;
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
		},
		error => 
		{
            console.log(error);
        });
    } 
   
	Exit(){
		this.user.Name = "";
		this.logined = false;
	}
}