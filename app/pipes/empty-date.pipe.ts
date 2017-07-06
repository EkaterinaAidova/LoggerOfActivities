import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'emptyDate'
})
export class EmptyDatePipe implements PipeTransform {
    transform(date: Date, args?: any): string {

        if (date == null) return "";
        let result: string;
        result = date.getDate + "/" + date.getMonth + "/" + date.getFullYear + " " + date.getHours + ":" + date.getMinutes;
        return result;
    }
}