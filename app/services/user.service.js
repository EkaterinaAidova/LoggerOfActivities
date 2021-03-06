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
const http_1 = require('@angular/http');
const Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
const user_account_model_1 = require("../models/user-account.model");
let UserService = class UserService {
    constructor(http) {
        this.http = http;
        this.url = "api/user";
    }
    get(id) {
        return this.http.get(this.url + "/" + id)
            .map((resp) => {
            let user = resp.json();
            return user;
        }).catch((error) => Observable_1.Observable.throw(error));
    }
    getCurrentUser() {
        let user = new user_account_model_1.UserAccount(); // =8;
        return this.http.get(this.url)
            .map((resp) => {
            user = resp.json();
            return user;
        });
    }
    getUsers() {
        return this.http.get(this.url + "/All").
            map((resp) => {
            let userList = resp.json();
            let users = [];
            for (let index in userList) {
                let user = userList[index];
                users.push({
                    ID: user.ID,
                    Email: user.Email,
                    Name: user.Name
                });
            }
            return users;
        }).catch((error) => { return Observable_1.Observable.throw(error); });
    }
    delete(id) {
        return this.http.delete(this.url + "/" + id);
    }
    logout() {
        return this.http.get(this.url + "/Exit");
    }
};
UserService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map