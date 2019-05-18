import { TestBed, inject } from '@angular/core/testing';

import { PizzaResolverService } from './pizza-resolver.service';

describe('PizzaResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PizzaResolverService]
    });
  });

  it('should be created', inject([PizzaResolverService], (service: PizzaResolverService) => {
    expect(service).toBeTruthy();
  }));
});
