import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs';

import { CouterService } from './couter.service';

describe('CouterService', () => {
  let service: CouterService;


  function expectCount(count:number) :void{
    let actualCount: number | undefined;
    service.getCount().pipe(first()).subscribe(
    (counter)=>{
      actualCount = counter
    });

    expect(actualCount).toBe(count)
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns the count',()=>{
    let actualCount : number | undefined
    service.getCount().subscribe(count=>{
      actualCount = count
    })

    expect(actualCount).toBe(0);
  })

  it('increments the count',()=>{
    service.increment();
    expectCount(1);
  })

});
