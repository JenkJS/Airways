import { TestBed } from '@angular/core/testing';

import { SearchFlightsStateService } from './search-flights-state.service';

describe('SearchFlightsStateService', () => {
  let service: SearchFlightsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchFlightsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
