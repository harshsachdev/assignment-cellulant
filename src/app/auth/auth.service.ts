import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface userData{
  email:string,
  token:string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor( private router:Router) { }

  /*
    Dummy username and password used in this service because crudcrud.com search params not found
  */


  //Behaviour Subject subscribed by other components to check whether user is authenticated or not  
  isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  
  
  /**
   * 
   * @param email 
   * @param password 
   * @returns Observable of type userData
   * 
   * This function is used to authenticate user
   * 
   */
  loginUser(email:string, password:string):Observable<userData>{
    if(email === environment.predifined_username && password === environment.predefined_password){
      this.isAuthenticatedSubject.next(true);
      return of({'email':email,'token':'dummytoken'}); 
    }else{
      return throwError( () => new Error('Invalid credentials'));
    }
  }

  /**
   * This function is used to log out user
   */

  logoutUser(){
    localStorage.removeItem('forex_dummy_user');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth']);
  }

  /**
   * This function is used to check whether user is logged in or not
   */

  get isLoggedIn(): boolean { 
    let authToken = localStorage.getItem('forex_dummy_user');
    if(authToken !== null){
      this.isAuthenticatedSubject.next(true);
      return true;
    }else{
      this.isAuthenticatedSubject.next(false);
      return false;
    }
  }


}
