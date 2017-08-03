import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Project } from "../models/project.model";
@Injectable()
export class ProjectService {
    constructor(private http: Http) {
    }
    private url: string = "api/project";
    public get(): Observable<Project[]> {
        return this.http.get(this.url )
            .map((resp: Response) => {
                let projectList = resp.json();
                let projects: Project[]=[];
                for (let index in projectList) {
                    let prj = projectList[index];
                    projects.push({
                        ID: prj.ID,
                       Name: prj.Name
                    });
                }
                return projects;
            }).catch((error: any) => Observable.throw(error));
    }
}