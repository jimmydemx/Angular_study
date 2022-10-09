import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import { ApiService, DOG } from './api.service';


export const mockDog: DOG = {
  message: 
  'https://images.dog.ceo/breeds/hound-basset/n02088238_9815.jpg',
  status: 'success'
};

describe('ApiService', () => {
  let service: ApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return false',()=>{
    expect( service.test1()).toBe(true);
  })

  it("should return all instance",()=>{
    service.getAllProfiles().subscribe((response)=>{
      console.log([123]);
     expect(Array.isArray([123])).toBe(false)
    })
  })
});



describe('DogService',()=>{

  let httpTestingController: HttpTestingController;
  let service: ApiService;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers:[ApiService],
      imports:[HttpClientTestingModule]
    });
   httpTestingController= TestBed.inject(HttpTestingController);
   service = TestBed.inject(ApiService);
  });

  afterEach(()=>{
    httpTestingController.verify()
  });

  it('shoulde be created',()=>{
     expect(service).toBeTruthy();
  });

  it('random should provide data',()=>{
    service.GetRandomDog().subscribe(dog=>{
      spyOn(console, 'log').and.callThrough();
      expect(dog).not.toBeNaN;
      expect(JSON.stringify(dog)).toEqual(JSON.stringify(mockDog));
    })
    // Although we make http request like  service.GetRandomDog()
    // here we mock the request, and flush=> designate the response mockDog 
    const req = httpTestingController
              .expectOne(`https://dog.ceo/api/breeds/image/random`);
    req.flush(mockDog);          
  });



  it('pass through search errors',()=>{
    const status = 500;
    const statusText = 'Server error';
    // ProgressEvent is a special type of Error,'API error' is the string to pass to contructor 
    const errorEvent = new ProgressEvent('API error');

    let actualError: HttpErrorResponse | undefined;

    service.GetRandomDog().subscribe(
  () => {
    fail('next handler must not be called');
  },
  (error) => {
    actualError = error;
  },
  () => {
    fail('complete handler must not be called');
  },
);

const req_err = httpTestingController
.expectOne(`https://dog.ceo/api/breeds/image/random`);

// here we got the http request and direct the return value as an error
req_err.error(
  errorEvent,
  {status, statusText}
)

// if the backend doesnt give any error, mannully through an error
if (!actualError) {
  throw new Error('Error needs to be defined');
}

// expect get exact equal to the mock data
expect(actualError.error).toBe(errorEvent);
expect(actualError.status).toBe(status);
expect(actualError.statusText).toBe(statusText);

  })
});
