import {Component, Output, EventEmitter} from '@angular/core';
import { TimeLog } from './models/time-log.model';
import { DateLog } from './models/info-from-time-modal.model';
import * as moment from 'moment';
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
    dl: DateLog = new DateLog();
    minDate: Date = new Date();
    maxDate: Date = new Date();
    constructor() { }

    public show(timeLog: TimeLog): void {
        this.dl.date = new Date(moment.now());
        console.log(this.dl.date);
        if (timeLog.Status == 1 && timeLog.LastResumeTime != null) this.minDate = timeLog.LastResumeTime;
        if (timeLog.Status == 2 && timeLog.LastPauseTime != null) this.minDate = timeLog.LastPauseTime;
        this.dl.id = timeLog.TaskID;
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true, 100);
    }

    public hide(param: boolean): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
        if (param == true) this.ok.emit(this.dl);

    }

    public onContainerClicked(event: MouseEvent): void {
        if ((<HTMLElement>event.target).classList.contains('modal')) {
            this.hide(false);
        }
    }

}
