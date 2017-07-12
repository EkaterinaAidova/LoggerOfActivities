import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
    name: 'emptyDate'
})
export class EmptyDatePipe implements PipeTransform {
    transform(date: any, ...args: string[]) {
        if (date == null) return ""
        return moment(date).format('DD/MM/YYYY hh:mm');
    }
}