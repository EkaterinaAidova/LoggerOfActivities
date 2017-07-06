import { Input } from "@angular/core";
import { TimerObservable } from "rxjs/Observable/TimerObservable";
import * as moment from 'moment/moment';
export class Timer{

    public time: number;
    @Input()
    startTime: number = 1000;
    SetStartTime(date: Date)
    {

         this.startTime=date.getTime() - new Date(0).getTime();

    }
    Start() {
        
        TimerObservable.create(this.startTime, 1000)
            .subscribe(t => this.time = this.startTime+t);//.format(this.format));
    }
    }