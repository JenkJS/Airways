import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { Country } from 'src/app/shared/data/country';
import { Router, ActivatedRoute } from '@angular/router';
import { DateTypeService } from 'src/app/core/services/date-type/date-type.service';
import {
  ApiService,
  IAirports,
  SearchFlightsStateService,
  SliderService,
} from '../../../../core';
import { BehaviorSubject } from 'rxjs';

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
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.scss'],
  encapsulation: ViewEncapsulation.None,

  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_FORMATS, useValue: DateTypeService.MY_DATA_FORMATS},
  ],
})
export class SearchFlightsComponent implements OnInit {
  public airports$!: BehaviorSubject<IAirports[] | null>;
  @Input() isBookingPage!: boolean;

  searchForm = new FormGroup({
    tripType: new FormControl<string>('roundTrip', [Validators.required]),
    from: new FormControl<IAirports | null>(null, [Validators.required]),
    dest: new FormControl<IAirports | null>(null, [Validators.required]),
    date: new FormGroup({
      singleDate: new FormControl<string>('', []),
      startDate: new FormControl<string>(''),
      endDate: new FormControl<string>(''),
    }),
    passengers: new FormGroup({
      adult: new FormControl<number>(0),
      child: new FormControl<number>(0),
      infant: new FormControl<number>(0),
    }),
  });

  country = Country;

  passengers = {
    adult: 0,
    child: 0,
    infant: 0,
  };

  isInfoPassSpanOpen = false;
  showPassengersOptions = false;
  isPlaceBlocksReverse = false;
  isOneWay = false;
  isDate = false;
  isPassengers!: boolean;
  wasPassOptionsBlockOpen = false;

  minDate = new Date();

  namesOfLabels = ['From', 'Destination'];
  exampleArrayOfPlace: Array<[string, string]> = [
    ['Chicago', 'CH'],
    ['Minsk', 'MNSK'],
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ApiService: ApiService,
    private sliderService: SliderService,
    private searchFlightsStateService: SearchFlightsStateService
  ) {}

  ngOnInit(): void {
    this.ApiService.getAirports();
    this.airports$ = this.ApiService.airports$;
    this.changeCalendarOnBookingPage();
  }

  get adult() {
    return this.searchForm.value.passengers?.adult;
  }
  get child() {
    return this.searchForm.value.passengers?.child;
  }
  get infant() {
    return this.searchForm.value.passengers?.infant;
  }
  get tripType() {
    return this.searchForm.value.tripType;
  }
  get singleDate() {
    return this.searchForm.value.date?.singleDate;
  }
  get startDate() {
    return this.searchForm.value.date?.startDate;
  }
  get endDate() {
    return this.searchForm.value.date?.endDate;
  }
  get totalPassengers(): number {
    return (
      this.passengers.adult + this.passengers.child + this.passengers.infant
    );
  }

  formSubmit() {
    this.wasPassOptionsBlockOpen = true;
    let formObject = { ...this.searchForm.value };

    if (this.isPlaceBlocksReverse) {
      formObject.from = this.searchForm.value.dest!;
      formObject.dest = this.searchForm.value.from!;
    }

    if (this.searchForm.valid && this.isPassengers && this.isDate && !this.isOneWay) {
      this.router.navigate(['booking/flights']);
      
      this.ApiService.getFlight({
        backDate: this.endDate,
        forwardDate: this.startDate,
        fromKey: formObject.from?.key,
        toKey: formObject.dest?.key,
      });

      this.onDateChange();
      this.setPassengers();

      this.searchFlightsStateService.setSearchFlightsForm(formObject);
    }
    if (this.searchForm.valid && this.isPassengers && this.isDate && this.isOneWay) {
      this.router.navigate(['booking/flights']);

      this.ApiService.getFlight({
        forwardDate: this.singleDate,
        fromKey: formObject.from?.key,
        toKey: formObject.dest?.key,
      });

      this.onDateChange();
      this.setPassengers();

      this.searchFlightsStateService.setSearchFlightsForm(formObject);
    }
  }

  reversePlaceBlocks() {
    this.namesOfLabels.reverse();

    this.isPlaceBlocksReverse = !this.isPlaceBlocksReverse;
  }

  oneWayIsTrue() {
    this.isOneWay = true;
  }

  oneWayIsFalse() {
    this.isOneWay = false;
  }

  openPassengersOptions() {
    this.showPassengersOptions = true;
    this.isInfoPassSpanOpen = true;
  }

  moreAdult() {
    let count = this.searchForm.controls.passengers.value?.adult;

    if (count) {
      count = count + 1;
      this.passengers.adult = count;
    }

    if (count === 0) {
      count = 1;
      this.passengers.adult = count;
    }

    this.searchForm.controls.passengers.value.adult = count;
  }

  moreChild() {
    let count = this.searchForm.controls.passengers.value?.child;

    if (count) {
      count = count + 1;
      this.passengers.child = count;
    }

    if (count === 0) {
      count = 1;
      this.passengers.child = count;
    }

    this.searchForm.controls.passengers.value.child = count;
  }

  moreInfant() {
    let count = this.searchForm.controls.passengers.value?.infant;

    if (count) {
      count = count + 1;
      this.passengers.infant = count;
    }

    if (count === 0) {
      count = 1;
      this.passengers.infant = count;
    }

    this.searchForm.controls.passengers.value.infant = count;
  }

  lessAdult() {
    let count = this.searchForm.controls.passengers.value?.adult;

    if (count !== 0) {
      if (count) {
        count = count - 1;
        this.passengers.adult = count;
        this.searchForm.controls.passengers.value.adult = count;
      }
    }
  }

  lessChild() {
    let count = this.searchForm.controls.passengers.value?.child;

    if (count !== 0) {
      if (count) {
        count = count - 1;
        this.passengers.child = count;
        this.searchForm.controls.passengers.value.child = count;
      }
    }
  }

  lessInfant() {
    let count = this.searchForm.controls.passengers.value?.infant;

    if (count !== 0) {
      if (count) {
        count = count - 1;
        this.passengers.infant = count;
        this.searchForm.controls.passengers.value.infant = count;
      }
    }
  }

  closeOptions() {
    this.wasPassOptionsBlockOpen = true;
    this.checkPassengers();
    this.showPassengersOptions = false;
  }

  onewWayDateCheck(control: FormControl<string>) {
    const todayDate = new Date().getTime();
    const videoDate = new Date(control.value).getTime();
    if (videoDate < todayDate) return { dateCheck: true };
    return null;
  }

  checkPassengers(): void {
    let emptyPassObjectString: string = '{"adult":0,"child":0,"infant":0}';
    if (JSON.stringify(this.passengers) !== emptyPassObjectString) {
      this.isPassengers = true;
    } else {
      this.isPassengers = false;
    }
  }

  checkDateInput() {
    if (this.tripType === 'roundTrip') {
      if (this.startDate && this.endDate) {
        this.isDate = true;
      } else this.isDate = false;
    } else {
      if (this.singleDate) {
        this.isDate = true;
      } else this.isDate = false;
    }
  }

  onDateChange() {
    const startDate = this.searchForm.get('date.startDate')?.value;
    const endDate = this.searchForm.get('date.endDate')?.value;

    if (startDate && endDate) {
      const startDateValue = new Date(startDate);
      const endDateValue = new Date(endDate);

      const dates: Date[] = [];
      const currentDate = new Date(startDateValue);

      const startDateOffset = new Date(startDateValue);
      startDateOffset.setDate(startDateOffset.getDate() - 5);
      while (startDateOffset < startDateValue) {
        dates.push(new Date(startDateOffset));
        startDateOffset.setDate(startDateOffset.getDate() + 1);
      }

      while (currentDate <= endDateValue) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      const endDateOffset = new Date(endDateValue);
      endDateOffset.setDate(endDateOffset.getDate() + 1);
      for (let i = 0; i < 5; i++) {
        dates.push(new Date(endDateOffset));
        endDateOffset.setDate(endDateOffset.getDate() + 1);
      }

      this.sliderService.setDates(dates);
    }
  }

  setPassengers() {
    this.sliderService.setPassengers(this.totalPassengers);
  }

  changeCalendarOnBookingPage() {
    let triptype: string | undefined =
      this.searchFlightsStateService.getSearchFlightsForm()?.tripType;
    if (this.isBookingPage) {
      if (triptype === 'oneWay') {
        this.isOneWay = true;
      } else this.isOneWay = false;
    }
  }
}
