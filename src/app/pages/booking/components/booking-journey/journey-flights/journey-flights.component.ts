import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { CurrencyServiceService, FlightAvailabilityService, FlightsResponse } from '../../../../../core/index';

@Component({
  selector: 'app-journey-flights',
  templateUrl: './journey-flights.component.html',
  styleUrls: ['./journey-flights.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JourneyFlightsComponent implements OnInit {
  @Input() flight!: FlightsResponse;
  @Input() public isSelected: boolean = false;
  @Output() public onSelectTripEvent = new EventEmitter();

  @Input() public selectedDateButtonBack: Date | null = null;
  @Input() public selectedDateButtonThere: Date | null = null;

  public flights: FlightsResponse[] = [];

  constructor(private flightAvailabilityService: FlightAvailabilityService,
              private currencyService: CurrencyServiceService) {}

  ngOnInit(): void {}

  selectedFlightIndex: number | null = null;

  public onSelectTrip(flight: FlightsResponse) {
    this.onSelectTripEvent.emit(flight);

    const selectedIndex = this.selectedFlightIndex;
    const clickedIndex = this.flights.indexOf(flight);

    if (selectedIndex === clickedIndex) {
      this.selectedFlightIndex = null;
    } else {
      this.selectedFlightIndex = clickedIndex;
    }
  }

  public formatTime(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours}h ${minutes}m`;
  }

  public isSelectedFlight(flight: FlightsResponse): boolean {
    if (!this.selectedDateButtonBack && !this.selectedDateButtonThere) {
      return false;
    }

    const flightDate = new Date(flight.takeoffDate);
  
    if (this.selectedDateButtonBack) {
      const selectedDateBack = new Date(this.selectedDateButtonBack);
      if (flightDate.toDateString() === selectedDateBack.toDateString()) {
  
        return true;
      } 
    }

    if (this.selectedDateButtonThere) {
      const selectedDateThere = new Date(this.selectedDateButtonThere);
      if (flightDate.toDateString() === selectedDateThere.toDateString()) {
 
        return true;
      } 
    }

    return false;
  }

  getCurrentCurrency(): keyof FlightsResponse['price'] {
    return this.currencyService.getCurrency();
  }
}
