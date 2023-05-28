import { TestBed } from '@angular/core/testing';

import { FlightsStateService } from './flights-state.service';

describe('FlightsStateService', () => {
  let service: FlightsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
