import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { Country } from 'src/app/shared/data/country';
import { Router, ActivatedRoute } from '@angular/router';
import {ApiService, IAirports} from "../../../../core";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchFlightsComponent implements OnInit {


  public airports$!: BehaviorSubject<IAirports[] | null>;



  ngOnInit(): void {
    this.ApiService.getAirports()
    this.airports$ = this.ApiService.airports$
  }

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

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private ApiService: ApiService) {}

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

  formSubmit() {
    this.wasPassOptionsBlockOpen = true;
    let formObject = { ...this.searchForm.value };

    if (this.isPlaceBlocksReverse) {
      formObject.from = this.searchForm.value.dest;
      formObject.dest = this.searchForm.value.from;
    }

    if (this.searchForm.valid && this.isPassengers && this.isDate) {
      this.router.navigate(['booking/flights']);
      this.ApiService.getFlight({
        "backDate": "2023-05-16T21:00:00.000Z",
        "forwardDate": "2023-05-16T21:00:00.000Z",
        "fromKey": formObject.from?.key,
        "toKey": formObject.dest?.key
      })
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
}
