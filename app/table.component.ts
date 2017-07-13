import { Component, Input, OnInit} from '@angular/core';
import { TimeLogService } from './services/time-log.service'
import { UserService } from './services/user.service';
import { PagerService } from './services/pager.service';
import { User } from './models/user.model';
import { TimeLog } from './models/time-log.model';
import { Activity } from './models/activity.model';
import { Project } from './models/project.model';
import { Timer } from './models/timer'
import {ActivityService } from './services/activity.service';
import { ProjectService } from './services/project.service';
import { TimeLogInfoForCreating } from './models/time-log-create.model';
import { DateLog } from './models/info-from-time-modal.model';
@Component(
    {
    selector: 'table-logs',
    templateUrl: './app/html/table.component.html',
    styles: ['.datetimepicker{min-width: 200px; font-size: 15px;}',
        '.table{background-color: lightcyan}',
        '.paused{background-color: lightyellow}',
        '.finished{background-color: mistyrose}',
        '.thead{background-color:whitesmoke}'
    ],
    })
export class TableComponent implements OnInit
{
    constructor(private userService: UserService, private timeLogService: TimeLogService, private projectService: ProjectService, private activityService: ActivityService, private pagerService: PagerService) { }
    user: User = new User();
	logined: boolean = false;
    timeLogs: TimeLog[] = [];
    projects: Project[] = [];
    activities: Activity[] = [];
    emptpyBlock: any;
    timer: Timer = new Timer();
    active: boolean = false;
    newLog: TimeLogInfoForCreating = new TimeLogInfoForCreating();
    pager: any = {};
    pagedItems: TimeLog[];
    GetTimeLogs() {
        this.timeLogService.getData(this.user.ID).subscribe(logs => {
            this.timeLogs = logs;
            if (this.timeLogs[0].Status == 1) {
                this.active = true;
                this.timer.SetStartTime(this.timeLogs[0].SpendingTime);
                this.timer.Start();
            }
            this.pager = this.pagerService.getPager(this.timeLogs.length, this.pager.currentPage);
            this.pagedItems = this.timeLogs.slice(this.pager.startIndex, this.pager.endIndex + 1);
            this.newLog.ProjectID = this.projects[0].ID;
            this.newLog.ActivityID = this.activities[0].ID;
        },
            error => {
                console.log(error);
            });
       
    }
    OnChanged(id: number)
    {
        this.user.ID = <number>id;
        console.log(id);
		this.logined = true;
        this.userService.get( this.user.ID).subscribe(user => {
            this.user = user;
           this.GetTimeLogs();
		},
		error => 
		{
            console.log(error);
        });
    } 

    Exit(ans: boolean) {
        if (ans) {
            this.user.Name = "";
            this.logined = false;
        }
    }
    activeOnPause()
    {
        this.timeLogService.SetStatus(this.timeLogs[0].TaskID, 2, new Date()).subscribe((response) => { console.log(response); });
        this.active = false;
    }
    Start(timeLog: TimeLog)
    {
        this.timeLogService.SetStatus(timeLog.TaskID, 1).subscribe((response) => { console.log(response); }); 
        this.GetTimeLogs();
    }
    Stop(dl: DateLog) {
        this.timeLogService.SetStatus(dl.id, 3, dl.date).subscribe((response) => { console.log(response); }); 
        this.active = false;
        this.GetTimeLogs();
    }
    Pause(dl: DateLog) {
        this.timeLogService.SetStatus(dl.id, 2, dl.date).subscribe((response) => { console.log(response); });
        this.active = false;
        this.GetTimeLogs();
    }
    ngOnInit()
    {
        this.activityService.get().subscribe(data => this.activities = data, error => console.log(error));
        this.projectService.get().subscribe(data => this.projects = data, error => console.log(error));
       
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
    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.timeLogs.length, page);
        this.pagedItems = this.timeLogs.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}