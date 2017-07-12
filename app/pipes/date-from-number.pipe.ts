import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'amDuration' })
export class DurationPipe implements PipeTransform {
    transform(value: number, ...args: string[]): string {
        if (typeof args === 'undefined' || args.length !=1) {
            throw new Error('DurationPipe: missing required time unit argument');
        }
        let v = value/10000;
     
        return moment.duration(v, args[0] as moment.unitOfTime.DurationConstructor).asHours().toFixed(2);
    }
}