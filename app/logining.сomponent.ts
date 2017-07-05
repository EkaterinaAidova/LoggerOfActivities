import { Component } from '@angular/core';
import {
    NgForm
} from '@angular/forms';
export class LoginingForm {
    login: string;
    password: string;
}
@Component({
    selector: 'my-app',
    styles: [`
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
    `],
    template: `<div> 
                    <div class="form-group">
                        <label>Логин</label>
                        <input class="form-control" name="login" [(ngModel)]="user.login" #login="ngModel" required />
                    </div>
                    <div class="form-group">
                        <label>Пароль</label>
                        <input class="form-control" type="password" name="password" [(ngModel)]="user.password" #password="ngModel" 
                            required  />
                    </div>
                   
                    <div class="form-group">
                        <button [disabled]="login.invalid || password.invalid"
                                class="btn btn-default" (click)="LogIn()">Войти</button>
                    </div>
              </div>`
})
export class LoginingComponent {

    loginigform: LoginingForm = new LoginingForm();
    LogIn() {
        console.log(this.loginigform);
        //отправка данных на сервер все хорошо - пользователь входит, форма становится невидимой, нет - сообщение об ошибке, оставляем форму висеть для повторной отправки
    }

}
