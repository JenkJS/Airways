import { ChangeDetectionStrategy,
         Component, EventEmitter,
         Input, Output
        } from '@angular/core';
import { FlightsResponse, SliderService, FlightsStateService, DateWithPrice, FlightAvailabilityService } from 'src/app/core';

@Component({
  selector: 'app-journey-dates',
  templateUrl: './journey-dates.component.html',
  styleUrls: ['./journey-dates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JourneyDatesComponent {
  @Input() flight!: FlightsResponse;
  @Input() public isSelected: boolean = false;

  @Input() public selectedDateButtonThere: Date | null = null;
  @Input() public selectedDateButtonBack: Date | null = null;

  @Output() public onDateButtonClickThereEvent = new EventEmitter();
  @Output() public onDateButtonClickBackEvent = new EventEmitter();
  @Output() public dateSelectedEvent = new EventEmitter<Date>();

  @Input() public dates: DateWithPrice[] = [];

  public currentIndex = 0;
  public monthNames: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  public dayOfWeekNames: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  constructor(private sliderService: SliderService,
              private flightAvailabilityService: FlightAvailabilityService) {}

  ngOnInit(): void {
    this.currentIndex = this.sliderService.getCurrentIndex();
  }

  public onDateButtonClickThere(item: Date) {
    this.onDateButtonClickThereEvent.emit(item);
  }

  public onDateButtonClickBack(item: Date) {
    this.onDateButtonClickBackEvent.emit(item);
  }
  
  public nextSlide(): void {
    this.sliderService.nextSlide();
    this.currentIndex = this.sliderService.getCurrentIndex();
  }
  
  public prevSlide(): void {
    this.sliderService.prevSlide();
    this.currentIndex = this.sliderService.getCurrentIndex();
  }
  
  public isCheckedDate(item: any): boolean {
    return (
      (this.selectedDateButtonThere !== null &&
        this.selectedDateButtonThere.getTime() === item.getTime()) ||
      (this.selectedDateButtonBack !== null &&
        this.selectedDateButtonBack.getTime() === item.getTime())
    );
  }

  public onClickThere(item: DateWithPrice) {
    if (this.selectedDateButtonThere) {
      this.checkTicketThere(item.price)
    }
  }

  public onClickBack(item: DateWithPrice) {
    if (this.selectedDateButtonBack) {
      this.checkTicketBack(item.price)
    }
  }

  public checkTicketThere(price: number | undefined): void {
    if (price !== undefined) {
      this.flightAvailabilityService.updateThereFlightsAvailable(true)
    } else {
      this.flightAvailabilityService.updateThereFlightsAvailable(false)
    }
  }
  public checkTicketBack(price: number | undefined): void {
    if (price !== undefined) {
      this.flightAvailabilityService.updateBackFlightsAvailable(true)
    } else {
      this.flightAvailabilityService.updateBackFlightsAvailable(false)
    }
  }
}
