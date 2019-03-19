import { TestBed, inject } from '@angular/core/testing';

import { EuromillionsService } from './euromillions.service';

describe('EuromillionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EuromillionsService]
    });
  });

  it('should be created', inject([EuromillionsService], (service: EuromillionsService) => {
    expect(service).toBeTruthy();
  }));
});
