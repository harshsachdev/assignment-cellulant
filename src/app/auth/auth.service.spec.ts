import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Check Auth functions', () =>{
    const authdata = {'email':'forex_user@demo.com','token':'dummytoken'};

    it('Test Login function', ()=>{
      service.loginUser('forex_user@demo.com', '123456789').subscribe((data)=>{
        expect(authdata).toEqual(data, 'should check mock data');
      });
    });

  })

});
