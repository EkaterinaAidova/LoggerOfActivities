import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TimeLog } from '../models/time-log.model';
import { TimeLogInfoForUpdating } from '../models/time-log-update.model';
import { TimeLogInfoForCreating } from '../models/time-log-create.model'


@Injectable()
export class TimeLogService {
    private url: string = "api/timeLog";
    constructor(private http: Http) {
    }
    public getData(id: number): Observable<TimeLog[]> {

        return this.http.get(this.url + "/" + id)
            .map((resp: Response) => {
                let logList = resp.json();
                let logs: TimeLog[] = [];
                for (let index in logList) {
                    let log = logList[index];
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
                        SpendingTime: log.SpendingTime
                    });
                }
                return logs;
            }).catch((error: any) => { return Observable.throw(error); });
    }
    public setStatus(id: number, status: number, date: Date) {
        let data = new TimeLogInfoForUpdating();
        data.LogId = id;
        data.Status = status;
        data.Date = new Date();
        if (date != undefined)
            data.Date = date;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.url, data, { headers: headers });
    }
    public createTimeLog(newLog: TimeLogInfoForCreating) {
        let headers = new Headers();
        let body = JSON.stringify(newLog);
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.url, body, { headers: headers });
    }
}

