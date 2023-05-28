import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewStateService {
  currentFlight = new BehaviorSubject<any[]>([]);

  constructor(){
    let currentFlightFromLocal = localStorage.getItem('reviewState');
    if(currentFlightFromLocal) this.currentFlight.next(JSON.parse(currentFlightFromLocal))
  }

  setReviewState(state: any) {
    this.currentFlight.next(state);
    localStorage.setItem('reviewState', JSON.stringify(state));
  }
}
