import {Timer} from './timer';
import { TimeLog } from './time-log.model';
import * as moment from 'moment';
export class ActiveLog {
    private id: number;
    public isEnable: boolean = false;
    public timer: Timer = new Timer();
    public setLog(log: TimeLog) {
        if (log.Status !== 1) {
            this.isEnable = false;
            return;
        }
        if (!this.isEnable || !this.checkLogOnActive(log.TaskID)) {
            this.id = log.TaskID;
            this.isEnable = true;
            this.timer.setStartTime(this.calculateStartPoint(log));
            this.timer.start();
        }

    }
    private calculateStartPoint(log: TimeLog): number {
        let spendingTime: number = 0;
        let betweenResumeAndNow: number = 0;
        let lastResume = moment(log.LastResumeTime).toDate().valueOf();
        if (log.LastResumeTime != null)
        {
            betweenResumeAndNow = (moment().toDate().valueOf() - lastResume) * 10000;   
        }
        if (log.SpendingTime != null) {
            spendingTime = log.SpendingTime;
        }

        let duration: number = spendingTime + betweenResumeAndNow;

        return duration;
    }
    public checkLogOnActive(id: number): boolean {
        if (id == this.id) return true;
        return false;
    }
    public onPause(): number
    {
        this.isEnable = false;
        console.log(this.id);
        return this.id;
    }
}