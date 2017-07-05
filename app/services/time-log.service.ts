import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TimeLog } from '../table.component';

@Injectable()
export class TimeLogService
{
    constructor(private _http: Http)
    {
    }
    public getData(id: number): Observable<TimeLog[]>
    {
        let url: string ="api/timeLogs/";
        return this._http.get(url + id)
        .map((resp: Response) => {
             let logList = resp.json();
			 console.log(logList);
                            let logs : TimeLog[] = [];
                            for(let index in logList){
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
								SpendingTime: log.SpendingTime});
                            }
                            return logs;
            }).catch((error: any) => { return Observable.throw(error); });
    }
    
}