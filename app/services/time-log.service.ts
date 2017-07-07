import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TimeLog } from '../models/time-log.model';

@Injectable()
export class TimeLogService
{
    private url: string = "api/timeLog";
    constructor(private http: Http)
    {
    }
    public GetData(id: number): Observable<TimeLog[]>
    {
        
        return this.http.get(this.url +"/"+id)
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
    public SetStatus(id: number, status: number)
    {
        let data = new PutTime();
        data.logId = id;
        data.status = status;
        data.time = new Date();
        let headers = new Headers();
        headers.append('Content-Type', 'application/json')
        return this.http.put(this.url + "/", JSON.stringify(data), { headers: headers });//.catch((error: any) => { return Observable.throw(error); });
    }
    
    
}
export class PutTime
{
    logId: number;
    status: number;
    time: Date;
}
