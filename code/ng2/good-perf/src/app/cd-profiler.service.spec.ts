import { TestBed, inject } from '@angular/core/testing';

import { CdProfilerService } from './cd-profiler.service';

describe('CdProfilerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CdProfilerService]
    });
  });

  it('should be created', inject([CdProfilerService], (service: CdProfilerService) => {
    expect(service).toBeTruthy();
  }));
});
