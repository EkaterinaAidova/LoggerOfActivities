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
const user_service_1 = require('./services/user.service');
const pager_service_1 = require('./services/pager.service');
let ModalAdminComponent = class ModalAdminComponent {
    constructor(pagerService, userService) {
        this.pagerService = pagerService;
        this.userService = userService;
        this.visible = false;
        this.visibleAnimate = false;
        this.pager = {};
    }
    show() {
        this.userService.getCurrentUser().subscribe(data => this.userId = data.UserInfo.ID);
        this.getUsers();
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true, 100);
    }
    hide() {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
    }
    onContainerClicked(event) {
        if (event.target.classList.contains('modal')) {
            this.hide();
        }
    }
    deleteUser(id) {
        this.userService.delete(id).subscribe(data => {
            if (data.ok) {
                this.getUsers();
            }
            else {
                alert(data.text());
            }
        });
    }
    setPage(page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.userList.length, page);
        this.pagedItems = this.userList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
    getUsers() {
        this.userService.getUsers().subscribe(data => this.userList = data);
        this.pager = this.pagerService.getPager(this.userList.length, this.pager.currentPage);
        this.pagedItems = this.userList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
};
ModalAdminComponent = __decorate([
    core_1.Component({
        selector: 'app-modal-admin',
        templateUrl: './app/html/modal-admin.component.html',
        styleUrls: ['./app/styles/shared.css']
    }), 
    __metadata('design:paramtypes', [pager_service_1.PagerService, user_service_1.UserService])
], ModalAdminComponent);
exports.ModalAdminComponent = ModalAdminComponent;
//# sourceMappingURL=modal-admin.component.js.map