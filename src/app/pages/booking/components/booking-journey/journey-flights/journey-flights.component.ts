import { ChangeDetectionStrategy,
         Component, EventEmitter,
         Input, Output, OnInit
        } from '@angular/core';
import { ApiService, FlightsResponse} from "../../../../../core/index";

@Component({
  selector: 'app-journey-flights',
  templateUrl: './journey-flights.component.html',
  styleUrls: ['./journey-flights.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JourneyFlightsComponent implements  OnInit{
  @Input() flight!:FlightsResponse
  @Input() public isTripSelectedThere:boolean = false;
  @Input() public isTripSelectedBack:boolean = false;
  @Output() public onSelectTripEvent = new EventEmitter();


  constructor(private ApiService: ApiService) {
  }

  ngOnInit(): void {
  }


  public onSelectTrip() {
    this.onSelectTripEvent.emit();
  }
}
