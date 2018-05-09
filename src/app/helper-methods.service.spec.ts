import { TestBed, inject } from '@angular/core/testing';

import { HelperMethodsService } from './helper-methods.service';

describe('HelperMethodsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelperMethodsService]
    });
  });

  it('should be created', inject([HelperMethodsService], (service: HelperMethodsService) => {
    expect(service).toBeTruthy();
  }));
});
