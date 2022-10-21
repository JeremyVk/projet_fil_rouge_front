import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'showPrice'})
export class ShowPricePipe implements PipeTransform {
    transform(value?: number, ...args: any[]) {
        if(value) {
            return value / 100
        }
        return 
    }
}