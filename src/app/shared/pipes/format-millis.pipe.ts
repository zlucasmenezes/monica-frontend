import { Pipe, PipeTransform } from '@angular/core';
import dateUtils from '../utils/date-utils';

@Pipe({
  name: 'formatMillis',
})
export class FormatMillisPipe implements PipeTransform {
  transform(millis: number, decimalPlaces = 1): string {
    return dateUtils.formatMillis(millis, decimalPlaces);
  }
}
