import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateTypeService {
  currentDateType = new BehaviorSubject<string>('MM/DD/YYYY');

  static MY_DATA_FORMATS = {
    parse: {
      dateInput: 'MM/DD/YYYY',
    },
    display: {
      dateInput: 'MM/DD/YYYY',
    },
  };

  constructor() {

  }

  setDateType(type: string): void {
    let typeString: string = type.split('/').join('-');
    DateTypeService.MY_DATA_FORMATS.parse.dateInput = typeString;
    DateTypeService.MY_DATA_FORMATS.display.dateInput = typeString;

    this.currentDateType.next(type);
  }
}
