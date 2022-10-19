import { ComponentFixture, TestBed, fakeAsync} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { AuthComponent } from './auth.component';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: AuthService;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        AuthComponent 
      ],
      imports: [ 
        RouterTestingModule, 
        ReactiveFormsModule
      ],
      providers: [
        {provide: Router, useValue: router}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Check login form', () => {
    it('should be invalid', () => {
      component.authForm.patchValue({
        "email": "", 
        "password": ""
      });
      expect(component.authForm.valid).toEqual(false);
    });

    it('should be valid', () => {
      component.authForm.patchValue({
        "email": "forex_demo@email.com", 
        "password": "123456789"
      });
      expect(component.authForm.valid).toEqual(true);
    });

    it('E-mail required', () => {
      component.authForm.patchValue({
        "email": "", 
        "password": "123456789"
      });
      expect(component.authForm.valid).toEqual(false);
    });

    it('Password required', () => {
      component.authForm.patchValue({
        "email": "forex_demo@email.com", 
        "password": ""
      });
      expect(component.authForm.valid).toEqual(false);
    });

    it('Invalid e-mail', () => {
      component.authForm.patchValue({
        "email": "forex_demo", 
        "password": "123456789"
      });
      expect(component.authForm.valid).toEqual(false);
    });

    it('Short Password', () => {
      component.authForm.patchValue({
        "email": "forex_demo@email.com", 
        "password": "123"
      });
      expect(component.authForm.valid).toEqual(false);
    });

  });

  describe('Check onSubmit method', () => {
    it('loginUser success', fakeAsync(() => {
      component.authForm.patchValue({
        "email": "forex_demo@email.com", 
        "password": "123"
      });
      
      const mockResponse = {
        email: 'forex_demo@email.com',
        token: 'adadad'
      };
      spyOn(authService, 'loginUser').and.callFake(() => {
        return of(mockResponse);
      });
      spyOn(localStorage, 'setItem');

      component.onSubmit();
      expect(component.authForm.valid).toBeFalse();
      expect(localStorage.setItem).toHaveBeenCalledWith('forex_dummy_user', JSON.stringify(mockResponse));
      expect(router.navigate).toHaveBeenCalledWith(['/markets']);
    }));
    it('loginUser error', fakeAsync(() => {
      component.is_loading  = true;
      component.error_msg = '';
      spyOn(authService, 'loginUser').and.returnValue(throwError({status: 404, error: {message: 'Error'}}));

      component.onSubmit();
      expect(component.is_loading).toBeFalse();
      expect(component.error_msg).toEqual('Invalid credentials');
    }));
  });
  
});
