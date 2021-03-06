import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'chatDate'
})
export class ChatDatePipe implements PipeTransform {

  transform(date: number): String {
    moment.locale('ja');
    return moment(date).format('LLLL');
  }

}
