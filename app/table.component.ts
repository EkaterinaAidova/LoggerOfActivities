import { Component, Input, OnInit} from '@angular/core';
import { TimeLogService } from './services/time-log.service'
import { UserService } from './services/user.service';
import { User } from './models/user.model';
import { TimeLog } from './models/time-log.model';
import { Activity } from './models/activity.model';
import { Project } from './models/project.model';
import { Timer } from './models/timer'
import {ActivityService } from './services/activity.service';
import { ProjectService } from './services/project.service';
import { TimeLogInfoForCreating } from './models/time-log-create.model';
@Component(
    {
    selector: 'table-logs',
    template: `<div class="userPanel" *ngIf="logined"> Сотрудник: {{user.Name}} 
                <button class="btn btn-default"(click) = "modal.show()" > Новое задание</button >
                <app-modal #modal (ok)=OnCloseModal($event) > 
                     <div class="app-modal-body">
				     Проект:
				         <select class="projectSelector" [(ngModel)]="newLog.ProjectID"> 
				             <option *ngFor="let project of projects" [value]="project.ID" > {{project.Name}} </option> 
				         </select>
				     Должность:
				        <select class="activitySelector"  [(ngModel)]="newLog.ActivityID"> 
				             <option *ngFor="let activity of activities" [value]="activity.ID"> {{activity.Position}} </option> 
				        </select>
                     </div> 
                </app-modal>  
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
					  <td *ngIf="timeLog.Status!=1">	{{timeLog.SpendingTime | amDuration:'ms' }}ч. </td>
                      <td *ngIf="timeLog.Status==1">   {{timer.time | amDuration:'ms' }} ч.</td>
					  <td>  {{timeLog.EndWorkTime | emptyDate }} </td>
					  <td> <button class="btn btn-default" [disabled]=" timeLog.Status == 1 || timeLog.Status == 3" (click)="Start(timeLog)">Start</button></td>
					  <td> <button class="btn btn-default" [disabled]=" timeLog.Status == 2 || timeLog.Status == 3" (click)="Pause(timeLog)">Pause</button></td>
					  <td> <button class="btn btn-default" [disabled]=" timeLog.Status == 3" (click)="Stop(timeLog)">Stop</button></td>
					  </tr>
               </table>                    
			   </div> <login *ngIf="!logined" (changedID)="OnChanged($event)"> </login> `
    

    })
export class TableComponent implements OnInit
{
	constructor(private userService: UserService, private timeLogService: TimeLogService, private projectService: ProjectService, private activityService: ActivityService) { }
    user: User = new User();
	logined: boolean = false;
    timeLogs: TimeLog[] = [];
    projects: Project[] = [];
    activities: Activity[] = [];
    emptpyBlock: any;
    timer: Timer = new Timer();
    newLog: TimeLogInfoForCreating = new TimeLogInfoForCreating();
    GetTimeLogs() {
        this.timeLogService.GetData(this.user.ID).subscribe(logs => {
            this.timeLogs = logs;
            if (this.timeLogs[0].Status == 1) {
                this.timer.startTime =this.timeLogs[0].SpendingTime;
                this.timer.Start();
            }
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
        this.userService.Get( this.user.ID).subscribe(user => {
            this.user = user;
           this.GetTimeLogs();
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
    Start(timeLog: TimeLog)
    {
        this.timeLogService.SetStatus(timeLog.TaskID, 1).subscribe((response) => { console.log(response); }); 
        this.GetTimeLogs();
    }
    Stop(timeLog: TimeLog) {
        this.timeLogService.SetStatus(timeLog.TaskID, 3).subscribe((response) => { console.log(response); }); 
        this.GetTimeLogs();
    }
    Pause(timeLog: TimeLog) {
        this.timeLogService.SetStatus(timeLog.TaskID, 2).subscribe((response) => { console.log(response); });
        this.GetTimeLogs();
    }
    ngOnInit()
    {
        this.activityService.Get().subscribe(data => this.activities = data, error => console.log(error));
        this.projectService.Get().subscribe(data => this.projects = data, error => console.log(error));
    }
    onSelectProject(project: Project)
    {
        this.newLog.ProjectID = project.ID;
    }
    onSelectActivity(activity: Activity)
    {
        this.newLog.ActivityID = activity.ID;
    }
    OnCloseModal(ok: boolean)
    {
        if (ok == true)
        {
            this.newLog.UserID = this.user.ID;
            this.timeLogService.CreateTimeLog(this.newLog).subscribe((response) => { console.log(response); });
            this.GetTimeLogs();
        }
    }
}