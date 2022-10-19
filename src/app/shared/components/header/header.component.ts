import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) { }
  
  isAuthenticated = false;

  headerObs!:Subscription;

  ngOnInit(): void {
  
    /**
     * Subscibed behaviour subject provided by Auth service to display Logout link on header
     */

    this.headerObs = this.authService.isAuthenticatedSubject.subscribe(
      (res) => {
        this.isAuthenticated = res;
      }
    ) 
  }

  /**
   * Method to handle logout
   */

  onLogout(){
    this.authService.logoutUser();
  }

  ngOnDestroy(): void {
    if(this.headerObs){
      this.headerObs.unsubscribe();
    }
  }

}
