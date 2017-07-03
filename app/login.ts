import { Component, Input } from '@angular/core';
import { LoginService} from './services/login.service';
import { Response} from '@angular/http';
export class LoginingForm {
    @Input() ID: number;
    @Input() Login: string;
    @Input() Password: string;
    
}
@Component({
    selector: 'login',
    styles: [`
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
    `],
    template: `<div> 
                    <div class="form-group">
                        <label>Логин</label>
                        <input class="form-control" name="login" [(ngModel)]="user.Login" #Login="ngModel" required />
                    </div>
                    <div class="form-group">
                        <label>Пароль</label>
                        <input class="form-control" type="password" name="password" [(ngModel)]="user.Password" #Password="ngModel" 
                            required  />
                    </div>
                   
                    <div class="form-group">
                        <button [disabled]="login.invalid || password.invalid"
                                class="btn btn-default" (click)="LogIn()">Войти</button>
                    </div>
              </div>`
})
export class LoginComponent {
    constructor(private _loginService: LoginService) { }
    user: LoginingForm = new LoginingForm();
    LogIn() {
        this._loginService.get('api/autorisation/', this.user.Login, this.user.Password).subscribe((data: Response) => this.user = data.json());
        console.log(this.user);
    }
}