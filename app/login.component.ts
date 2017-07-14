import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoginService} from './services/login.service';
import { LoginingForm } from './models/autorization.model';
@Component({
    selector: 'login',
    styles: [`
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
        #login {
        width: 300px;
    margin: 80px auto 40px;
    padding: 10px;
    position: relative; /* For the submit button positioning */
 
    /* Styles */
    box-shadow: 
        0 0 1px rgba(0, 0, 0, 0.3), 
        0 3px 7px rgba(0, 0, 0, 0.3), 
        inset 0 1px rgba(255,255,255,1),
        inset 0 -3px 2px rgba(0,0,0,0.25);
    border-radius: 5px;
    background: linear-gradient(#eeefef, #ffffff 10%);
    }
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