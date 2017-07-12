import { Input } from "@angular/core";
import { TimerObservable } from "rxjs/Observable/TimerObservable";
export class Timer{

    public time: number;
    startTime: number = 1000;
    @Input()
    SetStartTime(date: number)
    {
        if (date != null)
            this.startTime = date;
        else this.startTime = 0;
    }
    Start() {
        
        TimerObservable.create(0, 1000)
            .subscribe(t => {
                this.time = this.startTime+t*1000*10000;
               //  console.log(this.time);
            });//.format(this.format));
    }
    }