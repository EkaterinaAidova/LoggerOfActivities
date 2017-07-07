import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from "../models/user.model";
@Injectable()
export class UserService
{
    constructor(private _http: Http)
    {
    }
    private url: string = "api/user";
    public Get( id : number ): Observable<User>
    {
       // return this.http.get(url + "?id=" + id)
	   return this._http.get(this.url+"/"+id)
        .map((resp: Response) => {
            let user: User = resp.json();
            return user;
            }).catch((error: any) => { return Observable.throw(error); });
    }
   
}