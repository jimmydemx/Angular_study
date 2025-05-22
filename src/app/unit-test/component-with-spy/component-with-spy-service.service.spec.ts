import { TestBed } from '@angular/core/testing';

import { ComponentWithSpyServiceService } from './component-with-spy-service.service';

describe('ComponentWithSpyServiceService', () => {
  let service: ComponentWithSpyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentWithSpyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
