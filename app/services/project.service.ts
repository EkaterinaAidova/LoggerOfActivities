import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Project } from "../models/project.model";
@Injectable()
export class ProjectService {
    constructor(private _http: Http) {
    }
    private url: string = "api/project";
    public Get(): Observable<Project[]> {
        // return this.http.get(url + "?id=" + id)
        return this._http.get(this.url + "/" )
            .map((resp: Response) => {
                let projectList = resp.json();
                let projects: Project[]=[];
                for (let index in projectList) {
                    let prj = projectList[index];
                   // console.log(logList[index]);
                    projects.push({
                        ID: prj.ID,
                       Name: prj.Name
                    });
                }
                return projects;
            }).catch((error: any) => { return Observable.throw(error); });
    }

}