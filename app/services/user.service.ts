import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { User } from "../table.component";
@Injectable()
export class UserService
{
    constructor(private _http: Http)
    {
    }
    public get(url: string, id : number ): Observable<User>
    {
       // return this.http.get(url + "?id=" + id)
	   return this._http.get(url+id)
        .map((resp: Response) => {
            let user: User = resp.json();
            return user;
            }).catch((error: any) => { return Observable.throw(error); });
    }
   
}