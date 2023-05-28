import { Injectable } from '@angular/core';
import { ISearchFlightsForm } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class SearchFlightsStateService {
  private searchFlightsForm: ISearchFlightsForm | null = null;

  constructor() {
    this.loadFormFromLocalStorage();
  }

  setSearchFlightsForm(searchForm: any): void {
    this.searchFlightsForm = searchForm;
    localStorage.setItem('searchFlightsForm', JSON.stringify(searchForm));
  }

  getSearchFlightsForm(): ISearchFlightsForm | null {
    return this.searchFlightsForm;
  }

  private loadFormFromLocalStorage(): void {
    const storedForm = localStorage.getItem('searchFlightsForm');
    if (storedForm) {
      this.searchFlightsForm = JSON.parse(storedForm);
    }
  }
}
