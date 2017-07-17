import { Component, Input, OnInit} from '@angular/core';
import { TimeLogInfoForCreating } from './models/time-log-create.model';
import { DateLog } from './models/info-from-time-modal.model';
import { User } from './models/user.model';
import { TimeLog } from './models/time-log.model';
import { Activity } from './models/activity.model';
import { Project } from './models/project.model';
import { ActiveLog } from './models/active-log.model'
import {ActivityService } from './services/activity.service';
import { ProjectService } from './services/project.service';
import { TimeLogService } from './services/time-log.service'
import { UserService } from './services/user.service';
import { PagerService } from './services/pager.service';
import { CookieService } from './services/cookie.service';
@Component(
    {
        selector: 'table-logs',
        templateUrl: './app/html/table.component.html',
        styleUrls: ['./app/styles/table.component.css', './app/styles/shared.css'],
    })
export class TableComponent implements OnInit {
    constructor(private userService: UserService, private timeLogService: TimeLogService, private projectService: ProjectService, private activityService: ActivityService, private pagerService: PagerService, private cookieService: CookieService) { }
    private user: User = new User();
    public logined: boolean = false;
    public timeLogs: TimeLog[] = [];
    public projects: Project[] = [];
    public activities: Activity[] = [];
    public activeLog: ActiveLog = new ActiveLog();
    newLog: TimeLogInfoForCreating = new TimeLogInfoForCreating();
    pager: any = {};
    pagedItems: TimeLog[];
    getTimeLogs() {
        this.timeLogService.getData(this.user.ID).subscribe(logs => {
            this.timeLogs = logs;
            if (this.timeLogs[0].Status == 1) {
                this.activeLog.setLog(this.timeLogs[0])
            }
            this.pager = this.pagerService.getPager(this.timeLogs.length, this.pager.currentPage);
            this.pagedItems = this.timeLogs.slice(this.pager.startIndex, this.pager.endIndex + 1);
        },
            error => {
                alert(error);
            });
    }
    onChanged(id: number) {
        this.user.ID = <number>id;
        this.logined = true;
        this.userService.get(this.user.ID).subscribe(user => {
            this.user = user;
            this.getTimeLogs();
        },
            error => {
                alert(error);
            });
    }
    exit(ans: boolean) {
        if (ans) {
            this.user.Name = "";
            this.logined = false;
            this.cookieService.deleteCookie("userID");
        }
    }
    start(timeLog: TimeLog) {
        this.timeLogService.SetStatus(timeLog.TaskID, 1).subscribe((response) => {
            if (!response.ok) {
                alert(response.status + ": " + response.statusText);
            }
            return;
        });
        this.getTimeLogs();
    }
    stop(dl: DateLog) {
        if (this.activeLog.checkLogOnActive(dl.id)) {
            this.activeLog.isEnable = false;
        }
        this.timeLogService.SetStatus(dl.id, 3, dl.date).subscribe((response) => {
            if (!response.ok) {
                alert(response.status + ": " + response.statusText);
            }
            return;
        });
        this.getTimeLogs();
    }
    activeOnPause() {
        this.timeLogService.SetStatus(this.activeLog.onPause(), 2, new Date());
        this.getTimeLogs();
    }
    pause(dl: DateLog) {
        if (this.activeLog.checkLogOnActive(dl.id)) {
            this.activeLog.isEnable = false;
        }
        this.timeLogService.SetStatus(dl.id, 2, dl.date).subscribe((response) => { if (!response.ok) alert(response.status + ": " + response.statusText); return; });
        this.getTimeLogs();
    }
    ngOnInit() {
        let idValue = this.cookieService.getCookie("userID");
        if (idValue != "")
        {
            let id = Number.parseInt(idValue);
            this.onChanged(id);
        }
        this.activityService.get().subscribe(data => this.activities = data, error => alert(error));
        this.projectService.get().subscribe(data => this.projects = data, error => alert(error));

    }
    onSelectProject(project: Project) {
        this.newLog.ProjectID = project.ID;
    }
    onSelectActivity(activity: Activity) {
        this.newLog.ActivityID = activity.ID;
    }
    onCloseModal(ok: boolean) {
        if (ok == true) {
            this.newLog.UserID = this.user.ID;
            this.timeLogService.CreateTimeLog(this.newLog).subscribe((response) => { if (!response.ok) alert(response.status + ": " + response.statusText); return; });
            this.getTimeLogs();
        }
    }
    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.timeLogs.length, page);
        this.pagedItems = this.timeLogs.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
    onOpenModal(arg: boolean) {
        this.activityService.get().subscribe(data => this.activities = data, error => alert(error));
        this.projectService.get().subscribe(data => this.projects = data, error => alert(error));
        this.newLog.ProjectID = this.projects[0].ID;
        this.newLog.ActivityID = this.activities[0].ID;
    }
}