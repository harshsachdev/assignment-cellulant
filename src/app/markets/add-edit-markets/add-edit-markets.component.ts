import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Observable, take } from 'rxjs';
import { MarketData } from '../models/iMarket';
import { MarketsService } from '../services/markets.service';

@Component({
  selector: 'app-add-edit-markets',
  templateUrl: './add-edit-markets.component.html',
  styleUrls: ['./add-edit-markets.component.scss']
})
export class AddEditMarketsComponent implements OnInit {

  constructor(private marketService:MarketsService, private router:Router, private activatedRoute:ActivatedRoute, private _snackBar: MatSnackBar) { }

  marketForm!: FormGroup;

  is_loading = false;
  isAddMode!: boolean;
  id!:string;

  /**
   * Availale Exchanges
   */

  markets = [
    {name:'USD vs GBP', value:'USD-GBP'},
    {name:'USD vs INR', value:'USD-INR'},
    {name:'USD vs AUD', value:'USD-AUD'},
    {name:'USD vs CAD', value:'USD-CAD'},
    {name:'USD vs ZAR', value:'USD-ZAR'}
  ];

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Initialize a form
   * 
   * Note: Same form is used for both Create & Update
   */

  initForm(){

    this.id = this.activatedRoute.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.marketForm = new FormGroup({
      'market': new FormControl('', Validators.required),
      'sellingPrice': new FormControl(null, [Validators.required, Validators.maxLength(5)]),
      'buyingPrice': new FormControl(null, [Validators.required, Validators.maxLength(5)])
    });

    if(!this.isAddMode){
      this.marketService.getMarket(this.id).pipe(first()).subscribe(
        (data) => {
          this.marketForm.patchValue(data);
        }
      )
    }

  }

  /**
   * Form Submit method
   * 
   * Note: Same method is used for both update and delete
   */

  onSubmit(){
    this.is_loading = true;
    let market = '';
    let buyingPrice = '';
    let sellingPrice = '';
    
    let resObs: Observable<MarketData>;

    market = this.marketForm.value.market;
    sellingPrice = this.marketForm.value.sellingPrice;
    buyingPrice = this.marketForm.value.buyingPrice;

    if(this.isAddMode){
      resObs = this.marketService.createMarket({'market':market,'sellingPrice':sellingPrice,'buyingPrice':buyingPrice}).pipe(first());
      this.openSnackBar('Data Created Successfully');
    }else{
      resObs = this.marketService.updateMarket(this.id,{'market':market,'sellingPrice':sellingPrice,'buyingPrice':buyingPrice}).pipe(first());
      this.openSnackBar('Data updated Successfully');
    }

    resObs.subscribe(
      (data) => {
        this.router.navigate(['/']);
      },
      (error) => {
        this.is_loading = false;
        console.log(error);
      }
    )

  }

  /**
   * Method and properties to handle snackbar toast message
   */

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(message:string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'notif-success',
      duration: 5000
    });
  }

  /**
   * 
   */

   checkValue(event: KeyboardEvent) {

    if (parseInt((event.target as HTMLInputElement).value) < 0) {
      (event.target as HTMLInputElement).value = '0';
    }
  }

}
