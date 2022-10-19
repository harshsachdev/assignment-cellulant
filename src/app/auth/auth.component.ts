import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  authForm!: FormGroup;
  is_loading = false;
  error_msg = '';
  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Prefilled dummy credentials
   **/
  initForm(){
    this.authForm = new FormGroup({
      'email': new FormControl(environment.predifined_username, [Validators.required, Validators.email]),
      'password': new FormControl(environment.predefined_password, [Validators.required, Validators.maxLength(10), Validators.minLength(5)])
    });
  }

  /**
   * This the method called after submitting a login form
   */

  onSubmit(){
    this.is_loading = true;
    this.authService.loginUser(this.authForm.value.email, this.authForm.value.password).pipe(first()).subscribe((data) => {
      localStorage.setItem('forex_dummy_user',JSON.stringify(data));
      this.router.navigate(['/markets']);
    },
    (error) => {
      this.is_loading = false;
      this.error_msg = 'Invalid credentials';
    }
    )
  }

}
