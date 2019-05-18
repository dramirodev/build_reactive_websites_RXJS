import { TestBed, inject } from '@angular/core/testing';

import { RetryInterceptorService } from './retry-interceptor.service';

describe('RetryInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RetryInterceptorService]
    });
  });

  it('should be created', inject([RetryInterceptorService], (service: RetryInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
