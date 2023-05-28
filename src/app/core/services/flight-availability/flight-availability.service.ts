import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class FlightAvailabilityService {
  private flightsAvailableThereSubject = new BehaviorSubject<boolean>(true);
  public flightsAvailableThere$ = this.flightsAvailableThereSubject.asObservable();

  private flightsAvailableBackSubject = new BehaviorSubject<boolean>(true);
  public flightsAvailableBack$ = this.flightsAvailableBackSubject.asObservable();

  constructor() {}

  updateThereFlightsAvailable(available: boolean) {
    this.flightsAvailableThereSubject.next(available);
  }

  updateBackFlightsAvailable(available: boolean) {
    this.flightsAvailableBackSubject.next(available);
  }
}
