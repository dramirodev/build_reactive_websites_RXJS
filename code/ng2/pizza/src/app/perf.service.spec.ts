import { TestBed, inject } from '@angular/core/testing';

import { PerfService } from './perf.service';

describe('PerfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerfService]
    });
  });

  it('should be created', inject([PerfService], (service: PerfService) => {
    expect(service).toBeTruthy();
  }));
});
