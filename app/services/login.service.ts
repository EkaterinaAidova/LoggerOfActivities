import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {LoginingForm} from '../models/autorization.model';

@Injectable()
export class LoginService {
    constructor(private http: Http) { }
    private url: string = "api/autorization";
    public get(login: string, password: string): Observable<LoginingForm> {
        return this.http.get(this.url + "?login=" + login + "&password=" + password)
            .map((resp: Response) => {
                let user: LoginingForm = resp.json();
                return user;
            }).catch((error: any) => { return Observable.throw(error); });
    }
}