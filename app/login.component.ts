import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoginService} from './services/login.service';
import { LoginingForm } from './models/autorization.model';
@Component({
    selector: 'login',
    styles: [`
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
    `],
    templateUrl: './app/html/login.component.html'
})
export class LoginComponent {
    myDate: Date = new Date();
    constructor(private loginService: LoginService) { }
    user: LoginingForm = new LoginingForm();
    @Output() changedID = new EventEmitter<number>();
    isError: boolean = false;
    public LogIn() {
        this.loginService.get(this.user.Login, this.user.Password).subscribe(user => {
            this.user = user;
            this.isError = false;
            this.changedID.emit(user.ID);
        },
            error => {
                console.log(error);
                this.isError = true;
            });
    }
}