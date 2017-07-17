import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoginService} from './services/login.service';
import { LoginingForm } from './models/autorization.model';
import { CookieService } from './services/cookie.service';
@Component({
    selector: 'login',
    styleUrls: ['./app/styles/login.component.css', './app/styles/shared.css' ],
    templateUrl: './app/html/login.component.html'
})
export class LoginComponent {
    myDate: Date = new Date();
    constructor(private loginService: LoginService, private cookieService: CookieService) { }
    user: LoginingForm = new LoginingForm();
    @Output() changedID = new EventEmitter<number>();
    isError: boolean = false;
    public logIn() {
        this.loginService.get(this.user.Login, this.user.Password).subscribe(user => {
            this.user = user;
            this.isError = false;
            this.cookieService.setCookie("userID", this.user.ID.toString(), 7);
            this.changedID.emit(user.ID);
        },
            error => {
                alert(error);
                this.isError = true;
            });
    }
}