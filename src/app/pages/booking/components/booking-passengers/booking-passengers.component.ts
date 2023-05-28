import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchFlightsStateService } from 'src/app/core';
import { countries } from 'src/app/shared/constants/phone-codes';
import { Router } from '@angular/router';
import { PassengersFormStateService } from 'src/app/core/services/booking-passengers-state/booking-passengers-state.service';
import { DateTypeService } from 'src/app/core/services/date-type/date-type.service';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

@Component({
  selector: 'app-booking-passengers',
  templateUrl: './booking-passengers.component.html',
  styleUrls: ['./booking-passengers.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_FORMATS, useValue: DateTypeService.MY_DATA_FORMATS },
  ],
})
export class BookingPassengersComponent implements OnInit {
  public countries = countries;
  public today = new Date();
  public passArrayOfString: string[] = [];
  public isNoValid = false;

  public passengers!: [string, number][];
  public arrayForms: any[] = [];

  public contactForm = new FormGroup({
    code: new FormControl<number | string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    tel: new FormControl<number | string>('', [
      Validators.required,
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]),
  });

  constructor(
    private searchFlightsStateService: SearchFlightsStateService,
    private router: Router,
    private passService: PassengersFormStateService
  ) {
    const currentPassengers =
      this.searchFlightsStateService.getSearchFlightsForm()?.passengers;
    if (currentPassengers) this.passengers = Object.entries(currentPassengers);
  }

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
      let item: string = el + '-' + (index + 1);
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
    this.arrayForms.forEach((el) => {
      const form = el[1];
      let formValid = form.valid;
      if (formValid) allFormsIsValid = true;
    });

    if (allFormsIsValid && this.contactForm.valid) {
      let controlsArray = this.arrayForms.map((el) => el[1].value);
      let passengersFormValues = {
        contactInfo: this.contactForm.value,
        passengers: controlsArray,
      };
      this.isNoValid = false;
      this.router.navigate(['booking/review-payment']);
      this.passService.setPassengersForm(passengersFormValues);
    } else this.isNoValid = true;
  }
}
