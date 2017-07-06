import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'numberDate'
})
export class NumberDatePipe implements PipeTransform {
    transform(num: number, args?: any): string {
        let seconds = Math.round(num % 60);
        let minutes = 0;
        if (num >= 60)
            minutes = Math.round(num / 60);
        let hours = 0; 
        if (num >= 3600)
            hours = Math.round(num / 3600);

        //let hours = num / 1000 / 60 / 60;
      //  minutes -= hours * 60; 
       

        let res: string = hours+ "ч "+minutes + "м " + seconds + "сек";
        return res;  
    }
}