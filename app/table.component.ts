import { Component, Input, OnInit} from '@angular/core';
import { TimeLogInfoForCreating } from './models/time-log-create.model';
import { DateLog } from './models/info-from-time-modal.model';
import { UserAccount } from './models/user-account.model';
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
@Component(
    {
        selector: 'table-logs',
        templateUrl: './app/html/table.component.html',
        styleUrls: ['./app/styles/table.component.css', './app/styles/shared.css'],
    })
export class TableComponent implements OnInit {
    constructor(
        private userService: UserService,
        private timeLogService: TimeLogService,
        private projectService: ProjectService,
        private activityService: ActivityService,
        private pagerService: PagerService) { }
    private user: User = new User();
    public isAdmin: boolean = false;
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
    exit(ans: boolean) {
        if (ans) {
            this.user.Name = "";
            this.isAdmin = false;
            this.userService.logout().subscribe(resp => {
                if (resp.ok)
                {
                    location.reload(true);
                    sessionStorage.clear();
                }
                else { alert(resp.text);}
            })
        }
    }
    start(timeLog: TimeLog) {
        this.timeLogService.setStatus(timeLog.TaskID, 1, new Date()).subscribe((response) => {
            if (response.ok) {
                this.getTimeLogs();
            }
            else alert(response.status + ": " + response.statusText);
            return;
        });
       
    }
    stop(dl: DateLog) {
        if (this.activeLog.checkLogOnActive(dl.id)) {
            this.activeLog.isEnable = false;
        }
        this.timeLogService.setStatus(dl.id, 3, dl.date).subscribe((response) => {
            if (response.ok) {
                this.getTimeLogs();
            }
            else alert(response.status + ": " + response.statusText); 
            return;
        });
       
    }
    activeOnPause() {
        this.timeLogService.setStatus(this.activeLog.onPause(), 2, new Date()).subscribe((response) => {
            if (response.ok) this.getTimeLogs();
            else alert(response.status + ": " + response.statusText); return;
        });       
    }
    pause(dl: DateLog) {
        if (this.activeLog.checkLogOnActive(dl.id)) {
            this.activeLog.isEnable = false;
        }
        this.timeLogService.setStatus(dl.id, 2, dl.date).subscribe((response) => {
            if (response.ok)
            {
                this.getTimeLogs();
            }
            else alert(response.status + ": " + response.statusText); return;
        });        
    }
    ngOnInit() {
        this.userService.getCurrentUser().subscribe(data => {
            this.user = data.UserInfo;
            this.getTimeLogs();
        for (let role in data.UserRoles) {
            if (role.localeCompare("Admin")) {
                this.isAdmin = true;
                break;
            }
        }
        }, error => alert(error));
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
            this.timeLogService.createTimeLog(this.newLog).subscribe((response) => {
                if (response.ok) {
                    this.getTimeLogs();
                }
                else alert(response.status + ": " + response.statusText);
                return;
            });          
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