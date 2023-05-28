import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review-passengers-info',
  templateUrl: './review-passengers-info.component.html',
  styleUrls: ['./review-passengers-info.component.scss']
})
export class ReviewPassengersInfoComponent {
@Input() passengers: any;
}
