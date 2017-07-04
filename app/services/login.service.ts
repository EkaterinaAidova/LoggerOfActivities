import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {LoginingForm} from '../login';

@Injectable()
export class LoginService{
    constructor(private _http: Http) { }
    get(url: string, login: string, password: string): Observable<LoginingForm> {
        return this._http.get(url + "?login=" + login + "&password=" + password)
        .map((resp: Response) => {
            let user: LoginingForm = resp.json();
            return user;
            }).catch((error: any) => { return Observable.throw(error); });
            ;
            
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}