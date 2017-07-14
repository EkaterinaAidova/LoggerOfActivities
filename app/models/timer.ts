import { Input } from "@angular/core";
import { TimerObservable } from "rxjs/Observable/TimerObservable";

export class Timer {
    public time: number;
    startTime: number = 1000;
    public setStartTime(date: number) {
        if (date != null) {
            this.startTime = date;
        }
        else {
            this.startTime = 0;
        }
    }
    start() {
        TimerObservable.create(0, 60000)
            .subscribe(t => {
                this.time = this.startTime + t * 60000 * 10000;
                console.log(t);
            });
    }
}