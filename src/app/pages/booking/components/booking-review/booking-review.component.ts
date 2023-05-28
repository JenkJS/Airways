import { Component, OnInit } from '@angular/core';
import { PassengersFormStateService } from 'src/app/core/services/booking-passengers-state/booking-passengers-state.service';
import { FlightsStateService } from 'src/app/core';
import { FlightsResponse } from 'src/app/core';
import { ReviewStateService } from 'src/app/core/services/review-state/review-state.service';

@Component({
  selector: 'app-booking-review',
  templateUrl: './booking-review.component.html',
  styleUrls: ['./booking-review.component.scss'],
})
export class BookingReviewComponent implements OnInit {
  passengers: any[] = [];
  thereFlight!: FlightsResponse;
  backFlight!: FlightsResponse;

  constructor(
    private passService: PassengersFormStateService,
    private flightState: FlightsStateService,
    private reviewState: ReviewStateService
  ) {}

  ngOnInit(): void {
    this.createPassengersInfo();

    this.flightState.thereFlight.subscribe((el) => {

      this.thereFlight = el;
    });

    this.flightState.backFlight.subscribe((el) => {
      if (Object.entries(el).length !== 0) {

        this.backFlight = el;
        this.isRoundTrip = true;
      }
    });

    this.createFares();
  }

  isRoundTrip: boolean = false;

  fares: any = [];

  totalPrice: number = 0;

  createPassengersInfo() {
    this.passService.getPassengersForm().passengers.forEach((el: any) => {
      let type: string = Object.keys(el)[0].split('-')[0];
      let onePassengers = {
        name: Object.values(el).splice(0, 2).join(' '),
        bag: '1checked bag (total 23 kg) included',
        cabinBag: '1 cabin bag + 1 personal item (max. 8 kg) included',
        seat: '12G',
        type: type,
      };
      this.passengers.push(onePassengers);
    });
  }

  getFlightTime(date: Date) {
    let hour = date.toString().split('T')[1].split(':')[0];
    let minute = date.toString().split('T')[1].split(':')[1];
    return hour + ':' + minute;
  }

  createFares() {
    if (this.isRoundTrip) {
      this.passengers.forEach((el) => {
        let onePerson = {
          type: el.type,
          firstPrice: this.thereFlight.price.eur,
          backPrice: this.backFlight.price.eur,
          totalFlightPrice:
            this.thereFlight.price.eur! + this.backFlight.price.eur!,
        };
        this.fares.push(onePerson);
        this.totalPrice = this.totalPrice + onePerson.totalFlightPrice;
      });
    } else {
      this.passengers.forEach((el) => {
        let onePerson = {
          type: el.type,
          firstPrice: this.thereFlight.price.eur,
          backPrice: 0,
          totalFlightPrice: this.thereFlight.price.eur! + 0,
        };
        this.fares.push(onePerson);
        this.totalPrice = this.totalPrice + onePerson.totalFlightPrice;
      });
    }
  }

  get fromCity() {
    return this.thereFlight.form.city;
  }

  get toCity() {
    return this.thereFlight.to.city;
  }

  transformDateForCart(date: Date) {
    return date.toString().split('T')[1].split(':').slice(0, 2).join(':');
  }

  transformDateAndTime() {
    if (this.isRoundTrip) {
      let landingDateTo = this.transformDateForCart(
        this.thereFlight.landingDate
      );

      let takeoffDateTo = this.transformDateForCart(
        this.thereFlight.takeoffDate
      );

      let landingDateBack = this.transformDateForCart(
        this.backFlight.landingDate
      );

      let takeoffDateBack = this.transformDateForCart(
        this.backFlight.takeoffDate
      );

      const times = {
        fromDate: this.thereFlight.takeoffDate,
        fromTime: landingDateTo + ' — ' + takeoffDateTo,
        backDate: this.backFlight.takeoffDate,
        backTime: takeoffDateBack + ' — ' + landingDateBack,
      };
      return times;
    } else {
      let landingDateTo = this.transformDateForCart(
        this.thereFlight.landingDate
      );

      let takeoffDateTo = this.transformDateForCart(
        this.thereFlight.takeoffDate
      );

      const times = {
        fromDate: this.thereFlight.takeoffDate,
        fromTime: landingDateTo + ' — ' + takeoffDateTo,
        backDate: '',
        backTime: '',
      };
      return times;
    }
  }

  checkCountPassengers() {
    let passengers = {
      adult: 0,
      child: 0,
      infant: 0,
    };
    this.passengers.forEach((el) => {
      if (el.type === 'adult') passengers.adult++;
      if (el.type === 'child') passengers.child++;
      if (el.type === 'infant') passengers.infant++;
    });
    return passengers;
  }

  addInCart() {
    let type = this.isRoundTrip ? 'Round Trip' : 'One way';
    let oneFlight;
    if (this.isRoundTrip) {
      oneFlight = {
        numberFlightFirst: this.thereFlight.flightNumber,
        numberFlightBack: this.backFlight.flightNumber,
        flight: {
          oneWay: `${this.fromCity} - ${this.toCity}`,
          roundTrip: `${this.toCity} - ${this.fromCity}`,
        },
        type: type,
        dataAndTime: this.transformDateAndTime(),
        passengers: this.checkCountPassengers(),
        price: this.totalPrice,
        isBtnPanelOpen: false,
        isChecked: true,
      };
      this.reviewState.setReviewState(oneFlight);
    } else {
      oneFlight = {
        numberFlightFirst: this.thereFlight.flightNumber,
        numberFlightBack: '',
        flight: {
          oneWay: `${this.fromCity} - ${this.toCity}`,
          roundTrip: ``,
        },
        type: type,
        dataAndTime: this.transformDateAndTime(),
        passengers: this.checkCountPassengers(),
        price: this.totalPrice,
        isBtnPanelOpen: false,
        isChecked: true,
      };
      this.reviewState.setReviewState(oneFlight);
    }

  }
}
