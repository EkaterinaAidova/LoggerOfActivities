import { Pipe, PipeTransform } from '@angular/core';
import { Timer } from '../models/timer';
import { TimeLog } from '../models/time-log.model';
@Pipe({
    name: 'timer',
    pure: false
})
export class TimerPipe implements PipeTransform {
    transform(log: TimeLog, args?: any ): string {
        if (log.Status == 1) {
            if (args != undefined)
                return args.time;
            let timer = new Timer();
            if (log.SpendingTime != null)
                timer.startTime = log.SpendingTime.valueOf();
            timer.Start();
            return timer.time;
        }
        if (log.SpendingTime == null) return '';
        let result: string;
        result = log.SpendingTime.getDate + "/" + log.SpendingTime.getMonth + "/" + log.SpendingTime.getFullYear + " " + log.SpendingTime.getHours + ":" + log.SpendingTime.getMinutes;
        return result;
    }
}