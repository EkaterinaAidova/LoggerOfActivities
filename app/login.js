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
const login_service_1 = require('./services/login.service');
class LoginingForm {
}
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], LoginingForm.prototype, "ID", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], LoginingForm.prototype, "Login", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], LoginingForm.prototype, "Password", void 0);
exports.LoginingForm = LoginingForm;
let LoginComponent = class LoginComponent {
    constructor(_loginService) {
        this._loginService = _loginService;
        this.user = new LoginingForm();
        this.logined = new core_1.EventEmitter();
        this.changedID = new core_1.EventEmitter();
        this.isNotError = true;
    }
    LogIn() {
        this._loginService.get('api/autorization/', this.user.Login, this.user.Password).subscribe(user => { this.user = user; this.isNotError = true; console.log(user); this.logined.emit(true); }, error => {
            console.log(error);
            this.isNotError = false;
        });
        console.log(this.user);
    }
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], LoginComponent.prototype, "logined", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], LoginComponent.prototype, "changedID", void 0);
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        styles: [`
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
    `],
        template: ` <div [hidden]="isNotError==true"  class="alert alert-danger"> Неверные логин и пароль </div>
                  <div> 
                    <div class="form-group">
                        <label>Логин</label>
                        <input class="form-control" name="Login" [(ngModel)]="user.Login" #Login="ngModel" required />
                    </div>
                    <div class="form-group">
                        <label>Пароль</label>
                        <input type="password" class="form-control" name="Password"  [(ngModel)]="user.Password" #Password="ngModel" required />
                    </div>
                    <div class="form-group">
                        <button [disabled]=" Login.invalid || Password.invalid "
                                class="btn btn-default" (click)="LogIn()">Войти</button>
                    </div> 
              </div>`
    }), 
    __metadata('design:paramtypes', [login_service_1.LoginService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.js.map