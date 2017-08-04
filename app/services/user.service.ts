import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserAccount } from "../models/user-account.model";
import { User } from "../models/user.model"
@Injectable()
export class UserService {
    constructor(private http: Http) { }
    private url: string = "api/user";
    public get(id: number): Observable<UserAccount> {
        return this.http.get(this.url + "/" + id)
            .map((resp: Response) => {
                let user: UserAccount = resp.json();
                return user;
            }).catch((error: any) =>  Observable.throw(error));
    }
    public getCurrentUser(): Observable<UserAccount> {
        let user: UserAccount = new UserAccount();// =8;
       return this.http.get(this.url)
            .map((resp: Response) => {
                user = resp.json(); return user;
           });
    }
    public getUsers(): Observable<User[]>
    {
        return this.http.get(this.url + "/All").
            map((resp: Response) => {
                let userList = resp.json();
                let users: User[] = [];
                for (let index in userList) {
                    let user = userList[index];
                    users.push({
                        ID: user.ID,
                        Email: user.Email,
                        Name: user.Name
                    });
                }
                return users;
            }).catch((error: any) => { return Observable.throw(error); });
    }
    public delete(id: number)
    {
        return this.http.delete(this.url + "/" + id);
    }
    public logout() {
        return this.http.get(this.url+"/Exit");
    }
}