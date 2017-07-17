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
const platform_browser_1 = require('@angular/platform-browser');
const forms_1 = require('@angular/forms');
const http_1 = require('@angular/http');
const app_component_1 = require('./app.component');
const login_component_1 = require('./login.component');
const table_component_1 = require('./table.component');
const modal_component_1 = require('./modal.component');
const modal_time_component_1 = require('./modal-time.component');
const login_service_1 = require('./services/login.service');
const user_service_1 = require("./services/user.service");
const time_log_service_1 = require('./services/time-log.service');
const activity_service_1 = require('./services/activity.service');
const project_service_1 = require('./services/project.service');
const pager_service_1 = require('./services/pager.service');
const cookie_service_1 = require('./services/cookie.service');
const empty_date_pipe_1 = require('./pipes/empty-date.pipe');
const date_from_number_pipe_1 = require('./pipes/date-from-number.pipe');
const datetime_picker_1 = require('@ngui/datetime-picker');
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule, datetime_picker_1.NguiDatetimePickerModule],
        declarations: [app_component_1.AppComponent, login_component_1.LoginComponent, table_component_1.TableComponent, empty_date_pipe_1.EmptyDatePipe, date_from_number_pipe_1.DurationPipe, modal_component_1.ModalComponent, modal_time_component_1.ModalTimeComponent],
        providers: [login_service_1.LoginService, user_service_1.UserService, time_log_service_1.TimeLogService, project_service_1.ProjectService, activity_service_1.ActivityService, pager_service_1.PagerService, cookie_service_1.CookieService],
        bootstrap: [app_component_1.AppComponent],
        entryComponents: [modal_component_1.ModalComponent]
    }), 
    __metadata('design:paramtypes', [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map