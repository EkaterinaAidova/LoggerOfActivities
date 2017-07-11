import {Component, Output, EventEmitter} from '@angular/core';
import { TimeLog } from './models/time-log.model';

@Component({
    selector: 'app-modal',
    templateUrl: './app/html/modal-time.component.html',
    styles: [`
    .modal {
      background: rgba(0,0,0,0.6);
    }
  `]
})
export class ModalComponent {

    public visible = false;
    private visibleAnimate = false;
    @Output() ok = new EventEmitter<DateLog>();
    dl: DateLog = new DateLog();
    constructor() { }

    public show(timeLog: TimeLog): void {
        if (timeLog.Status == 1) this.dl.date = timeLog.LastResumeTime;
        else this.dl.date = timeLog.LastPauseTime;
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
export class DateLog
{
    date: Date;
    id: number
}