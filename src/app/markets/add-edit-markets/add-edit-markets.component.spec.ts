import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialComponentsModule } from 'src/app/shared/material-module/material.module';
import { MarketsModule } from '../markets.module';
import { MarketsService } from '../services/markets.service';

import { AddEditMarketsComponent } from './add-edit-markets.component';

describe('AddEditMarketsComponent', () => {
  let component: AddEditMarketsComponent;
  let fixture: ComponentFixture<AddEditMarketsComponent>;
  let _snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMarketsComponent ],
      imports: [ReactiveFormsModule,HttpClientTestingModule, RouterTestingModule, MaterialComponentsModule],
      providers: [MarketsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditMarketsComponent);
    component = fixture.componentInstance;
    _snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  
  describe('Form validation check', () => {
    
    it('should be invalid', () => {
      component.marketForm.patchValue({
        "market": "", 
        "sellingPrice": "", 
        "buyingPrice": ""
      });
      expect(component.marketForm.valid).toEqual(false);
    });

    it('should be valid', () => {
      component.marketForm.patchValue({
        "market": "USD-INR", 
        "sellingPrice": "0.078", 
        "buyingPrice": "0.080"
      });
      expect(component.marketForm.valid).toEqual(true);
    });

    it('market field required', () => {
      component.marketForm.patchValue({
        "market": "", 
        "sellingPrice": "0.078", 
        "buyingPrice": "0.080"
      });
      expect(component.marketForm.valid).toEqual(false);
    });

    it('Selling Price required', () => {
      component.marketForm.patchValue({
        "market": "USD-INR", 
        "sellingPrice": "", 
        "buyingPrice": "0.080"
      });
      expect(component.marketForm.valid).toEqual(false);
    });

    it('Buying price required', () => {
      component.marketForm.patchValue({
        "market": "USD-INR", 
        "sellingPrice": "0.078", 
        "buyingPrice": ""
      });
      expect(component.marketForm.valid).toEqual(false);
    });

  });

  describe('openSnackBar', () => {
    it('openSnackBar', fakeAsync(() => {
      spyOn(_snackBar, 'open');
      
      component.openSnackBar('1');
      expect(_snackBar.open).toHaveBeenCalled();
    }));
  });
  

});
