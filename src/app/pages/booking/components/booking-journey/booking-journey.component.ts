import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  FlightsResponse,
  FlightsStateService,
  DateWithPrice,
  SliderService,
  FlightAvailabilityService,
} from '../../../../core/index';

@Component({
  selector: 'app-booking-journey',
  templateUrl: './booking-journey.component.html',
  styleUrls: ['./booking-journey.component.scss'],
})
export class BookingJourneyComponent implements OnInit {
  @Output() public openResentSearchEvent = new EventEmitter();
  @Output() public onSelectTripEvent = new EventEmitter();

  public selectedFlight: FlightsResponse | null = null;
  public flights$!: BehaviorSubject<FlightsResponse[] | null>;
  public selectedDateButtonBack: Date | null = null;
  public selectedDateButtonThere: Date | null = null;
  public onDateButtonClickBackEvent = new EventEmitter();
  public oBacknDateButtonClickThereEvent = new EventEmitter();
  public isSelectedThere: boolean = false;
  public isSelectedBack: boolean = false;

  public datesThere: DateWithPrice[] = [];
  public datesBack: DateWithPrice[] = [];

  public areFlightsAvailableThere: boolean = false;
  public areFlightsAvailableBack: boolean = false;

  constructor(
    private flightsStateService: FlightsStateService,
    private sliderService: SliderService,
    private flightAvailabilityService: FlightAvailabilityService
  ) {}

  ngOnInit(): void {
    this.flightsStateService.flights$.subscribe(
      (flights: FlightsResponse[] | null) => {
        this.flights$ = new BehaviorSubject<FlightsResponse[] | null>(flights);
        this.updateDatePrices();
      }
    );

    const currentDate = new Date();
    this.selectedDateButtonThere = currentDate;
    this.selectedDateButtonBack = currentDate;

    this.updateDatePrices();

    this.flightAvailabilityService.flightsAvailableThere$.subscribe(
      (areFlightsAvailable: boolean) => {
        this.areFlightsAvailableThere = areFlightsAvailable;
      }
    );
    this.flightAvailabilityService.flightsAvailableBack$.subscribe(
      (areFlightsAvailable: boolean) => {
        this.areFlightsAvailableBack = areFlightsAvailable;
      }
    );
  }

  private updateDatePrices(): void {
    const storedDates = this.sliderService.getDates();

    this.datesThere = storedDates.map((dateString) => {
      const date = new Date(dateString);
      const price = this.flightsStateService.getPriceForDate(date);
      return { date, price } as DateWithPrice;
    });

    this.datesBack = storedDates.map((dateString) => {
      const date = new Date(dateString);
      const price = this.flightsStateService.getPriceForDateBack(date);
      return { date, price } as DateWithPrice;
    });
  }

  public onDateButtonClickBack(item: Date) {
    this.selectedDateButtonBack = item;
  }

  public onDateButtonClickThere(item: Date) {
    this.selectedDateButtonThere = item;
  }

  public onSelectTrip(directionFlights: string, flight: FlightsResponse) {
    this.selectedFlight = flight;

    if (directionFlights === 'there') {
      this.isSelectedThere = true;
      this.selectedFlight.isSelected = true;

      this.flightsStateService.setThereFlight(flight);
    } else if (directionFlights === 'back') {
      this.isSelectedBack = true;
      this.selectedFlight.isSelected = true;

      this.flightsStateService.setBackFlight(flight);
    }
  }
}
