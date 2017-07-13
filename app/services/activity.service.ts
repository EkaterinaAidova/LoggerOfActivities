import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Activity } from "../models/activity.model";

@Injectable()
export class ActivityService {
    constructor(private http: Http) {
    }
    private url: string = "api/activity";
    public get(): Observable<Activity[]> {
        return this.http.get(this.url + "/")
            .map((resp: Response) => {
                let activityList = resp.json();
                let activities: Activity[] = [];
                for (let index in activityList) {
                    let act = activityList[index];
                    activities.push({
                        ID: act.ID,
                        Position: act.Position
                    });
                }
                return activities;
            }).catch((error: any) => Observable.throw(error));
    }
}