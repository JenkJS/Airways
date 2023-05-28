import { TestBed } from '@angular/core/testing';

import { FlightAvailabilityService } from './flight-availability.service';

describe('FlightAvailabilityService', () => {
  let service: FlightAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
