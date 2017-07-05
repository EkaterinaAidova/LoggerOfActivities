"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
class LoginingForm {
}
exports.LoginingForm = LoginingForm;
let LoginingComponent = class LoginingComponent {
    constructor() {
        this.loginigform = new LoginingForm();
    }
    LogIn() {
        console.log(this.loginigform);
        //отправка данных на сервер все хорошо - пользователь входит, форма становится невидимой, нет - сообщение об ошибке, оставляем форму висеть для повторной отправки
    }
};
LoginingComponent = __decorate([
    core_1.Component({
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
    }), 
    __metadata('design:paramtypes', [])
], LoginingComponent);
exports.LoginingComponent = LoginingComponent;
//# sourceMappingURL=logining.component.js.map