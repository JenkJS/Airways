import { Pipe, PipeTransform } from '@angular/core';
import { FlightsResponse } from '../../core/index';

@Pipe({
  name: 'checkDateColor',
})
export class CheckFlightColor implements PipeTransform {
  transform(value: Date, flight: FlightsResponse): string {
    let color: string = '';

    const checkFlights = (flights: FlightsResponse[]): void => {
      flights.forEach((el: FlightsResponse) => {
        let dayOfFlight = new Date(el.takeoffDate).getDate();
        let currentDate = new Date(value).getDate();
        if (dayOfFlight === currentDate) {
          let max: number = el.seats.total;
          let available: number = el.seats.avaible;
          let halfOfMax: number = max / 2;

          if (available > halfOfMax) {
            color = 'borderBottomGreen';
          } else if (available <= halfOfMax && available > 10) {
            color = 'borderBottomOrange';
          } else {
            color = 'borderBottomRed';
          }
        }

        if (el.otherFlights) {
          const otherFlights = Object.values(el.otherFlights);
          checkFlights(otherFlights);
        }
      });
    };

    if (flight) {
      checkFlights([flight]);
    }

    return color;
  }
}
