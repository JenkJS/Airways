import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../core/index';
import {
  ApiService,
  FlightsResponse,
  FlightsStateService,
  PassengerOption,
} from '../../core/index';
import { Country } from '../../shared/index';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { LocationService } from 'src/app/core/services/location/location.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  @Output() public openResentSearchEvent = new EventEmitter();
  @Output() public increasePassengerCountEvent = new EventEmitter();
  @Output() public decreasePassengerCountEvent = new EventEmitter();
  @Output() public getPassengerSummaryEvent = new EventEmitter();

  public flights$!: BehaviorSubject<FlightsResponse[] | null>;
  public countries = Country;
  public isAuth!: boolean;
  public currentPath!: string;
  public openStatus: boolean = false;
  public passengerOptions: PassengerOption[] = [
    { label: 'Adults', yearsLimit: '14+', passengerCount: 1 },
    { label: 'Children', yearsLimit: '2-14', passengerCount: 0 },
    { label: 'Infants', yearsLimit: '0-2', passengerCount: 0 },
  ];

  constructor(
    private location: Location,
    private locationService: LocationService,
    private flightsStateService: FlightsStateService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.flightsStateService.flights$.subscribe(
      (flights: FlightsResponse[] | null) => {
        this.flights$ = new BehaviorSubject<FlightsResponse[] | null>(flights);
      }
    );

    this.locationService.currentLocation.subscribe((el) => {
      this.currentPath = el;
    });

    this.authService.isAuth$.subscribe((el) => {
      this.isAuth = el;
    });
  }

  public openResentSearch() {
    this.openStatus = !this.openStatus;
  }

  public increasePassengerCount(passenger: PassengerOption): void {
    passenger.passengerCount++;
  }

  public decreasePassengerCount(passenger: PassengerOption): void {
    if (passenger.passengerCount > 0) {
      passenger.passengerCount--;
    }
  }

  public getPassengerSummary(): string {
    const passengers = this.passengerOptions.filter(
      (option) => option.passengerCount > 0
    );
    const summary = passengers
      .map((option) => `${option.label} ${option.passengerCount}`)
      .join(', ');
    return summary || '';
  }

  public goBack() {
    this.location.back();
  }

  public checkContinuePage(): string {
    let nextPage: string = '';
    if (this.isAuth) {
      if (this.currentPath === '/booking/flights')
        nextPage = '/booking/passengers';
      if (this.currentPath === '/booking/passengers')
        nextPage = '/booking/passengers';
    } else {
      nextPage = '/booking/flights';
    }

    return nextPage;
  }

  checkAuth() {
    if (this.isAuth === false) {
      this.authService.onOpen();
    }
  }
}
