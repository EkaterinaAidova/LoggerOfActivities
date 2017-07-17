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
const info_from_time_modal_model_1 = require('./models/info-from-time-modal.model');
let ModalTimeComponent = class ModalTimeComponent {
    constructor() {
        this.visible = false;
        this.visibleAnimate = false;
        this.ok = new core_1.EventEmitter();
        this.date = new Date();
        this.dl = new info_from_time_modal_model_1.DateLog();
        this.minDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
        this.maxDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
        this.minFullDate = new Date();
        this.maxFullDate = new Date();
        this.minHour = 0;
        this.minMinutes = 0;
        this.maxHour = 23;
        this.maxMinutes = 59;
        this.timeFlag = false;
        this.isEarly = false;
        this.isLater = true;
    }
    show(timeLog) {
        this.date = new Date();
        if (timeLog.Status == 1 && timeLog.LastResumeTime != null)
            this.setMinTime(timeLog.LastResumeTime);
        if (timeLog.Status == 2 && timeLog.LastPauseTime != null)
            this.setMinTime(timeLog.LastPauseTime);
        this.dl.id = timeLog.TaskID;
        this.visible = true;
        this.checkMinMaxHours();
        setTimeout(() => this.visibleAnimate = true, 100);
    }
    onChange(val) {
        this.maxFullDate = new Date();
        this.checkMinMaxHours();
    }
    hide(param) {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
        if (param == true) {
            this.dl.date = this.date;
            this.ok.emit(this.dl);
        }
    }
    onContainerClicked(event) {
        if (event.target.classList.contains('modal')) {
            this.hide(false);
        }
    }
    setMinTime(date) {
        let num = date.valueOf();
        this.minFullDate = new Date(num);
        this.minDate = new Date(this.minFullDate.getFullYear(), this.minFullDate.getMonth(), this.minFullDate.getDate());
    }
    checkMinMaxHours() {
        this.isEarly = false;
        this.isLater = false;
        let year = this.date.getFullYear();
        let month = this.date.getMonth();
        let day = this.date.getDate();
        let hour = this.date.getHours();
        let minute = this.date.getMinutes();
        let minyear = this.minFullDate.getFullYear();
        let minmonth = this.minFullDate.getMonth();
        let minday = this.minFullDate.getDate();
        let minhour = this.minFullDate.getHours();
        let maxyear = this.maxFullDate.getFullYear();
        let maxmonth = this.maxFullDate.getMonth();
        let maxday = this.maxFullDate.getDate();
        let maxhour = this.maxFullDate.getHours();
        if (year == minyear && month == minmonth && day == minday) {
            this.minHour = minhour;
            if (hour == minhour) {
                this.minMinutes = this.minFullDate.getMinutes();
                if (minute < this.minMinutes) {
                    this.date.setMinutes(this.minMinutes);
                    this.isEarly = true;
                }
            }
            if (hour < minhour) {
                this.date.setHours(minhour);
                this.date.setMinutes(this.minMinutes);
                this.isEarly = true;
            }
        }
        else {
            this.minMinutes = 0;
            this.minHour = 0;
        }
        if (year == maxyear && month == maxmonth && day == maxday) {
            this.maxHour = maxhour;
            if (hour == maxhour) {
                this.maxMinutes = this.maxFullDate.getMinutes();
                if (minute > this.maxMinutes) {
                    this.date.setMinutes(this.maxMinutes);
                    this.isLater = true;
                }
            }
            if (hour > maxhour) {
                this.date.setHours(maxhour);
                this.date.setMinutes(this.maxMinutes);
                this.isLater = true;
            }
        }
        else {
            this.maxMinutes = 59;
            this.maxHour = 23;
        }
    }
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], ModalTimeComponent.prototype, "ok", void 0);
ModalTimeComponent = __decorate([
    core_1.Component({
        selector: 'app-modal-time',
        templateUrl: './app/html/modal-time.component.html',
        styleUrls: ['./app/styles/shared.css']
    }), 
    __metadata('design:paramtypes', [])
], ModalTimeComponent);
exports.ModalTimeComponent = ModalTimeComponent;
//# sourceMappingURL=modal-time.component.js.map