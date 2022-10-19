import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { first, take } from 'rxjs';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { MarketData } from './models/iMarket';
import { MarketsService } from './services/markets.service';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss']
})
export class MarketsComponent implements AfterViewInit {

  constructor(private marketService:MarketsService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  markets: MarketData[] = [];
  isLoading = true;
  dataSource!:MatTableDataSource<MarketData>;
  is_error = false;
  error_message!:string;
  displayedColumns: string[] = ['market', 'selling_price', 'buying_price', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.fillData();
  }

  /**
   * Method to update data to table. 
   */

  fillData(){
    this.marketService.getAllMarkets().pipe(take(1)).subscribe((data)=>{
      this.markets = data;
      this.dataSource = new MatTableDataSource<MarketData>(this.markets);
      this.isLoading = false;
      this.dataSource.paginator = this.paginator;
    },
    (e) => {
      this.isLoading = false;
      this.is_error = true;
      this.error_message = e.error.message;
    } 
    );
  }

  /**
   * 
   * @param _id 
   * 
   * Method to delete excahnge rate from table
   * 
   * Note: This method is also responsible for handling a dialog box
   */

  deleteMarket(_id:string){
    console.log(_id);
    const confirmDialog = this.dialog.open(DeleteModalComponent, {
      data: {
        title: `Delete Item.`,
        message: 'Are you sure, you want to delete this. This action can not be undone?' 
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        if(_id){
          this.marketService.deleteMarket(_id).pipe(first()).subscribe((res) => {
            this.isLoading = true;
            this.displaySnackBar('Data deleted Successfully');
            this.fillData();
          });
        }
      }
    });
  }

  /**
   * Snackbar for delete message
   */

   horizontalPosition: MatSnackBarHorizontalPosition = 'center';
   verticalPosition: MatSnackBarVerticalPosition = 'top';
 
   displaySnackBar(message:string) {
     this._snackBar.open(message, 'Close', {
       horizontalPosition: this.horizontalPosition,
       verticalPosition: this.verticalPosition,
       duration: 5000
     });
   }

}