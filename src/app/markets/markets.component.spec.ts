import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { MaterialComponentsModule } from '../shared/material-module/material.module';

import { MarketsComponent } from './markets.component';
import { MarketsService } from './services/markets.service';

const mockMarket = {
  _id: '1',
  market: 'test',
  sellingPrice: '422',
  buyingPrice: '4212',
}
describe('MarketsComponent', () => {
  let component: MarketsComponent;
  let fixture: ComponentFixture<MarketsComponent>;
  let marketService: MarketsService;
  let _snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketsComponent ],
      imports: [HttpClientTestingModule, MaterialComponentsModule, BrowserAnimationsModule],
      providers:[MarketsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    marketService = TestBed.get(MarketsService);
    _snackBar = TestBed.inject(MatSnackBar);
  });

  describe('Check If service is Injecting properly or not', () => {
    it('Dependency Injection test using testbed method', () => {
      expect(marketService instanceof (MarketsService)).toBeTruthy();
    });
  });

  describe('fillData', () => {
    it('fillData success', fakeAsync(() => {
      component.markets = [];
      const mockResponse = [mockMarket, {...mockMarket, _id: '22'}];
      spyOn(marketService, 'getAllMarkets').and.callFake(() => {
        return of(mockResponse);
      });

      component.fillData();
      expect(component.markets).toEqual(mockResponse);
    }));
    it('fillData error', fakeAsync(() => {
      component.isLoading  = true;
      component.is_error  = false;
      component.error_message = '';

      const mockError = {status: 404, error: {message: 'Error'}};
      spyOn(marketService, 'getAllMarkets').and.returnValue(throwError(mockError));

      component.fillData();
      expect(component.isLoading).toBeFalse();
      expect(component.is_error).toBeTrue();
      expect(component.error_message).toEqual(mockError.error.message);
    }));
  });


  describe('deleteMarket', () => {
    it('deleteMarket success', fakeAsync(() => {
      component.markets = [];
      const mockResponse = [mockMarket, {...mockMarket, _id: '22'}];
      spyOn(marketService, 'deleteMarket').and.callFake(() => {
        return of(mockResponse);
      });
      
      component.deleteMarket('1');
      expect(component.deleteMarket).toBeTruthy();
    }));
  });

  describe('displaySnackBar', () => {
    it('displaySnackBar', fakeAsync(() => {
      spyOn(_snackBar, 'open');
      
      component.displaySnackBar('1');
      expect(_snackBar.open).toHaveBeenCalled();
    }));
  });

});
