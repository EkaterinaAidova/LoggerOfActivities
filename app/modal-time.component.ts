import {Component, Output, EventEmitter, Input} from '@angular/core';
import { TimeLog } from './models/time-log.model';
import { DateLog } from './models/info-from-time-modal.model';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl }   from '@angular/forms';
import { Ng2Datetime } from "ng2-datetime-picker";
@Component({
    selector: 'app-modal-time',
    templateUrl: './app/html/modal-time.component.html',
    styles: [`
    .modal {
      background: rgba(0,0,0,0.6);
    }
  `]
})
export class ModalTimeComponent {

    public visible = false;
    private visibleAnimate = false;
    @Output() ok = new EventEmitter<DateLog>();
    date2:Date = new Date();
    dl: DateLog = new DateLog();
    minDate: Date = new Date(this.date2.getFullYear(), this.date2.getMonth(), this.date2.getDate());
    maxDate: Date = new Date(this.date2.getFullYear(), this.date2.getMonth(), this.date2.getDate());
    minFullDate: Date = new Date();
    maxFullDate: Date = new Date();
    minHour: number = 0;
    minMinutes: number = 0;
    maxHour: number = 23;
    maxMinutes: number = 59;
    timeFlag: boolean = false;
  
    constructor() { }

    public show(timeLog: TimeLog): void {
        this.dl.date = new Date();
        console.log(this.dl.date);
        if (timeLog.Status == 1 && timeLog.LastResumeTime != null) this.setMinTime(timeLog.LastResumeTime);
        if (timeLog.Status == 2 && timeLog.LastPauseTime != null) this.setMinTime(timeLog.LastPauseTime);
        this.dl.id = timeLog.TaskID;
        this.visible = true;
        this.checkMinMaxHours();
        setTimeout(() => this.visibleAnimate = true, 100);
    }
       
    public onTimeChange(val) {
        console.log(val);
        this.maxFullDate = new Date();
        this.checkMinMaxHours();

    }
    public hide(param: boolean): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
        if (param == true) {
            this.dl.date = this.date2;
            this.ok.emit(this.dl);

        }

    }

    public onContainerClicked(event: MouseEvent): void {
        if ((<HTMLElement>event.target).classList.contains('modal')) {
            this.hide(false);
        }
    }
    setMinTime(date: Date)
    {
        let num = date.valueOf();
        this.minFullDate = new Date(num);
        this.minDate = new Date(this.minFullDate.getFullYear(), this.minFullDate.getMonth(), this.minFullDate.getDate());
    }
    checkMinMaxHours()
    {
        let year = this.date2.getFullYear();
        let month = this.date2.getMonth();
        let day = this.date2.getDate();
        let hour = this.date2.getHours();
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
            }
        }
        else {
            this.minMinutes = 0;
            this.minHour = 0;
        }
        if (year == maxyear && month == maxmonth && day == maxday) {
            this.maxHour = maxhour;
            if (hour == maxhour) {
                this.maxMinutes = this.maxDate.getMinutes();
            }
        }
        else {
            this.maxMinutes = 59;
            this.maxHour = 23;
        }
        if (this.minDate.getDate == this.maxDate.getDate && this.minDate.getMonth == this.maxDate.getMonth && this.minDate.getFullYear == this.maxDate.getFullYear)
            this.timeFlag = true;
       
    }
}
