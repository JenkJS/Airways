import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review-fare',
  templateUrl: './review-fare.component.html',
  styleUrls: ['./review-fare.component.scss'],
})
export class ReviewFareComponent {
  @Input() fares: any;
  @Input() totalPrice!: number;
  @Input() isRoundWay!: boolean;
}
