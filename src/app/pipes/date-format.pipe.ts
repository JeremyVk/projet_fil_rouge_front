import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value?: Date, ...args: unknown[]): unknown {
    if (!value) {
      return;
    }
    let date = new Date(value).toLocaleDateString('fr')
    return date;
  }
}
