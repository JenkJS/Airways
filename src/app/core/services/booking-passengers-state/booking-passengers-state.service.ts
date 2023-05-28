import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PassengersFormStateService {
  private passengersInfo: any;

  constructor() {
    this.loadFormFromLocalStorage();
  }

  setPassengersForm(passFormValues: any): void {
    this.passengersInfo = passFormValues;
    localStorage.setItem('passengersFormValues', JSON.stringify(passFormValues));
  }

  getPassengersForm() {
    return this.passengersInfo;
  }

  private loadFormFromLocalStorage(): void {
    const storedForm = localStorage.getItem('passengersFormValues');
    if (storedForm) {
      this.passengersInfo = JSON.parse(storedForm);
    }
  }
}
