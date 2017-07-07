import { Input } from "@angular/core";
import { TimerObservable } from "rxjs/Observable/TimerObservable";
export class Timer{

    public time: number;
    @Input()
    startTime: number = 1000;
    SetStartTime(date: Date)
    {
        if (date != null)
            this.startTime = date.getTime() - new Date(0).getTime();
        else this.startTime = 0;
    }
    Start() {
        
        TimerObservable.create(this.startTime, 1000)
            .subscribe(t => {
                this.time = this.startTime+t*1000; //console.log(this.time);
            });//.format(this.format));
    }
    }