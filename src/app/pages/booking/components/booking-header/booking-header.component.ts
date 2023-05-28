import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FlightsResponse, ICountry, SliderService } from 'src/app/core';
import { PassengerOption } from 'src/app/core/models/passenger-option.model';

@Component({
  selector: 'app-booking-header',
  templateUrl: './booking-header.component.html',
  styleUrls: ['./booking-header.component.scss']
})
export class BookingHeaderComponent implements OnInit {
  @Input() flight!:FlightsResponse;
  @Input() public openStatus: boolean = false;
  @Input() public  passengerOptions: PassengerOption[] = [];
  @Input() public countries: ICountry[] = [];
  @Output() public openResentSearchEvent = new EventEmitter();
  @Output() public increasePassengerCountEvent = new EventEmitter();
  @Output() public decreasePassengerCountEvent = new EventEmitter();
  @Output() public getPassengerSummaryEvent = new EventEmitter();

  public countryControl = new FormControl<string | null>(null, Validators.required);
  public passengers = new FormControl(this.passengerOptions[0]);
  public dates: Date[] = [];
  public monthNames: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public totalPassengers: number = 0;

  constructor(private sliderService: SliderService) {}

  ngOnInit(): void {
    const storedDates = this.sliderService.getDates();
    if (storedDates) {
      this.dates = storedDates.map(dateString => new Date(dateString));
    }
    const storedPassengers = this.sliderService.getPassengers();
    if (storedPassengers) {
      this.totalPassengers = storedPassengers;
    }
  }

  public openResentSearch() {
    this.openResentSearchEvent.emit();
  }

  public increasePassengerCount(passenger: PassengerOption): void {
    this.increasePassengerCountEvent.emit(passenger);
  }

  public decreasePassengerCount(passenger: PassengerOption): void {
    this.decreasePassengerCountEvent.emit(passenger);
  }

  public getPassengerSummary(): string {
    this.getPassengerSummaryEvent.emit()
    const passengers = this.passengerOptions.filter(option => option.passengerCount > 0);
    const summary = passengers.map(option => `${option.label} ${option.passengerCount}`).join(', ');
    return summary || '';
  }

  public displayCountry(country: any): string {
    // Возвращаем значение для отображения в mat-select
    if (!country) {
      return "Select a country"; // Значение для отображения до выбора опции
    }
    return country.country; // Значение выбранной опции
  }

}

