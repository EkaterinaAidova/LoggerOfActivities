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
const autorization_model_1 = require('./models/autorization.model');
const cookie_service_1 = require('./services/cookie.service');
let LoginComponent = class LoginComponent {
    constructor(loginService, cookieService) {
        this.loginService = loginService;
        this.cookieService = cookieService;
        this.myDate = new Date();
        this.user = new autorization_model_1.LoginingForm();
        this.changedID = new core_1.EventEmitter();
        this.isError = false;
    }
    logIn() {
        this.loginService.get(this.user.Login, this.user.Password).subscribe(user => {
            this.user = user;
            this.isError = false;
            this.cookieService.setCookie("userID", this.user.ID.toString(), 7);
            this.changedID.emit(user.ID);
        }, error => {
            alert(error);
            this.isError = true;
        });
    }
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], LoginComponent.prototype, "changedID", void 0);
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        styleUrls: ['./app/styles/login.component.css', './app/styles/shared.css'],
        templateUrl: './app/html/login.component.html'
    }), 
    __metadata('design:paramtypes', [login_service_1.LoginService, cookie_service_1.CookieService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map