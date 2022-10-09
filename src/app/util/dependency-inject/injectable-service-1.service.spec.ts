import { TestBed } from '@angular/core/testing';

import { InjectableService1 } from './injectable-service-1.service';

describe('InjectableService1Service', () => {
  let service: InjectableService1;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InjectableService1);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
