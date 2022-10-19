import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '@environment/environment';
import { MarketData } from '../models/iMarket';

@Injectable({
  providedIn: 'root'
})
export class MarketsService {

  url = `${environment.base_url}/${environment.token}/markets/`;

  constructor(private httpClient: HttpClient) { }

  /**
   * 
   * @returns Observable of type MarketData Array
   * 
   * This function is used to get all Markets
   * 
   */

  public getAllMarkets(){
    return this.httpClient.get<MarketData[]>(this.url).pipe(catchError(this.handleError));
  }

  /**
   * 
   * @param _id 
   * @returns Observable of type MarketData
   * 
   * This function is used to get a single Market
   * 
   */

  public getMarket(_id:string){
    return this.httpClient.get<MarketData>(this.url+`${_id}`).pipe(catchError(this.handleError));
  }

  /**
   * 
   * @param market 
   * @returns Observable of type MarketData
   * 
   * This function is used to create a resource
   * 
   */

  public createMarket(market:MarketData){
    return this.httpClient.post<MarketData>(this.url,market).pipe(catchError(this.handleError));
  }

  /**
   * 
   * @param _id 
   * @param market 
   * @returns Observable of type MarketData
   * 
   * This function is used to update a resource 
   * 
   */

  public updateMarket(_id:string, market:MarketData){
    return this.httpClient.put<MarketData>(this.url+`${_id}`, market).pipe(catchError(this.handleError));
  }

  /**
   * 
   * @param _id 
   * @returns empty object
   * 
   * This function is used to delete a resource
   * 
   */

  public deleteMarket(_id:string){
    return this.httpClient.delete<{}>(this.url+`${_id}`).pipe(catchError(this.handleError));
  }

  /**
   * 
   * @param error 
   * @returns Observable of type error
   * 
   * This function is used to handle errors.
   *
   */

  public handleError(error:HttpErrorResponse){
    let errorMsg:string = '';
    if(error.error instanceof ErrorEvent){
      errorMsg = `Error: ${error.error.message}`;
    }else{
      errorMsg = `Status: ${error.status} \n Message: ${error.message}`;
    }
    return throwError( () => new Error(errorMsg));
  }

}
