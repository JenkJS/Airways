import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { countries } from 'src/app/shared/constants/phone-codes';

@Component({
  selector: 'app-booking-passengers',
  templateUrl: './booking-passengers.component.html',
  styleUrls: ['./booking-passengers.component.scss'],
})
export class BookingPassengersComponent implements OnInit {
  public countries = countries;
  public today = new Date();
  public passArrayOfString: string[] = [];
  public isNoValid = false;
  public agg = false;

  step1Obj = {
    tripType: 'roundTrip',
    from: {
      country: 'Andorra',
      calling_code: 376,
    },
    dest: {
      country: 'Algeria',
      calling_code: 213,
    },
    date: {
      singleDate: '',
      startDate: '2023-05-15T21:00:00.000Z',
      endDate: '2023-05-22T21:00:00.000Z',
    },
    passengers: {
      adult: 1,
      child: 1,
      infant: 0,
    },
  };

  public passengers = Object.entries(this.step1Obj.passengers);
  public arrayForms: any[] = [];

  public contactForm = new FormGroup({
    code: new FormControl<number | string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    tel: new FormControl<number | string>('', [
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]),
  });
  constructor() {}

  ngOnInit(): void {
    this.transformPass();
    this.createForm();
  }

  transformPass() {
    this.passengers.forEach((el) => {
      if (el[1] !== 0) {
        while (el[1] > 0) {
          this.passArrayOfString.push(el[0]);
          el[1]--;
        }
      }
    });
  }

  createForm() {
    let allForms: any = {};
    this.passArrayOfString.forEach((el, index) => {
      let itemArray = [];
      let item: string = el + (index + 1);
      let spanText: string = index + 1 + '. ' + this.capitalizeFirstLetter(el);

      allForms = new FormGroup({
        [item + 'FirstName']: new FormControl<string>('', [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ]),
        [item + 'LastName']: new FormControl<string>('', [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ]),
        [item + 'Gender']: new FormControl<string>('', Validators.required),
        [item + 'BirthdayDate']: new FormControl<string>(
          '',
          Validators.required
        ),
        [item + 'Invalid']: new FormControl<boolean>(false),
      });
      let keys = Object.keys(allForms.controls);
      itemArray.push(spanText, allForms, keys, '', false, false);
      this.arrayForms.push(itemArray);
    });
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  submitForm() {
    let allFormsIsValid = false;
    console.log('controlsArray');
    this.arrayForms.forEach((el: any) => {
      const form = el[1];
      let formValid = form.valid;
      if (formValid) allFormsIsValid = true;
    });

    let controlsArray = this.arrayForms.map((el) => el[1].value);
    controlsArray.push(this.contactForm.value);

    if (allFormsIsValid && this.contactForm.valid) {
      let controlsArray = this.arrayForms.map((el) => el[1].value);
      controlsArray.push(this.contactForm.value);
      this.isNoValid = false;
      console.log(controlsArray);
    } else this.isNoValid = true;
  }

  log() {
    console.log('asd');
  }

}
