import {Component, Output, EventEmitter, Input} from '@angular/core';
import { TimeLog } from './models/time-log.model';
import { DateLog } from './models/info-from-time-modal.model';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl }   from '@angular/forms';
@Component({
    selector: 'app-modal-time',
    templateUrl: './app/html/modal-time.component.html',
    styleUrls: ['./app/styles/shared.css']
})
export class ModalTimeComponent {
    public visible = false;
    private visibleAnimate = false;
    @Output() ok = new EventEmitter<DateLog>();
    date: Date = new Date();
    dl: DateLog = new DateLog();
    minDate: Date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
    maxDate: Date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
    minFullDate: Date = new Date();
    maxFullDate: Date = new Date();
    minHour: number = 0;
    minMinutes: number = 0;
    maxHour: number = 23;
    maxMinutes: number = 59;
    timeFlag: boolean = false;
    isEarly = false;
    isLater = true;
    constructor() { }
    public show(timeLog: TimeLog): void {
        this.date = new Date();
        if (timeLog.Status == 1 && timeLog.LastResumeTime != null) this.setMinTime(timeLog.LastResumeTime);
        if (timeLog.Status == 2 && timeLog.LastPauseTime != null) this.setMinTime(timeLog.LastPauseTime);
        this.dl.id = timeLog.TaskID;
        this.visible = true;
        this.checkMinMaxHours();
        setTimeout(() => this.visibleAnimate = true, 100);
    }
    public onChange(val: Date) {
        this.maxFullDate = new Date();
        this.checkMinMaxHours();
    }
    public hide(param: boolean): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
        if (param == true) {
            this.dl.date = this.date;
            this.ok.emit(this.dl);
        }
    }
    public onContainerClicked(event: MouseEvent): void {
        if ((<HTMLElement>event.target).classList.contains('modal')) {
            this.hide(false);
        }
    }
    setMinTime(date: Date) {
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
}
