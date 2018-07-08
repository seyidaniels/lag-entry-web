import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgProgress} from 'ngx-progressbar';
import {Http} from '@angular/http';
import { AppService } from '../app.service';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../auth.service';
import {Validation} from '../Validation';


@Component({
  selector: 'app-auth',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

@Input() loggedIn: boolean;

  title = 'app';
  posts;
  signup = false;
  forgot = false;
  signInForm;
  signUpForm;
  register_validation_errors: any;
  register_errors;
  register_success;
  signin_validation_errors: any;
 signin_errors;
 signin_success;
 userData;
 reset_success;
 reset_error;


  constructor(
    private authService: AuthService,
    private validate: Validation
  ) {}

  ngOnInit() {
      this.signInForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl('')
      });
      // Create the signUp Form
      this.signUpForm = new FormGroup({
        username: new FormControl(''),
        fullname: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        password_confirmation: new FormControl(''),
        course: new FormControl(''),
        jambScore: new FormControl('')
      });
  }


  submitSignUp(value) {
    this.clearErrors();
    if (!this.validate.validate(value)) {
      this.register_errors = 'Kindly fill your credentials';
      return;
    }
    const submitBTN = <HTMLButtonElement>document.getElementById('registerBTN');
    submitBTN.disabled = true;
    submitBTN.innerHTML = 'Signing up Up..';
    this.authService.signUp(value).subscribe(
      data => {
        if (data['validation_errors']) {
          this.register_validation_errors = data['validation_errors'];
          submitBTN.disabled = false;
          submitBTN.innerHTML = '<i class="si si-user-follow mr-10"></i> Sign Up';
          return;
        }
        if (data['message']) {
          this.register_success = 'You have successfully created an account with us';
          this.register_success += '<br>Kindly login to access your account';
          setTimeout(function() {
            location.reload();
          }, 2500);
          return;
        }
      }
    );
  }

  submitSignIn(value) {
    this.clearErrors();
    if (!this.validate.validate(value)) {
          this.signin_errors = 'Insufficient Credentials Provided';
          return;
        }
    const submitBTN = <HTMLButtonElement>document.getElementById('signin_button');
    submitBTN.disabled = true;
    submitBTN.innerHTML = '<i class="fas fa-cog fa-spin" mr-10"></i> Please Wait!';
        this.authService.signIn(value).subscribe(
          data => {
            if (data['validation_errors']) {
              this.signin_validation_errors = data['validation_errors'];
              submitBTN.innerHTML = '<i class="fas fa-sign-in-alt mr-10"></i> Sign In Again! ';
              submitBTN.disabled = false;
              return;
            }
            if (data['error']) {
              this.signin_errors = data['error'];
              submitBTN.innerHTML = '<i class="fas fa-sign-in-alt mr-10"></i> Sign In Again! ';
              submitBTN.disabled = false;
              return;
            }
            if (data['token']) {
              this.saveToken(data['token']);
              this.signin_success = 'Authentication Successful!';
              this.userData = JSON.stringify(data['user']);
              localStorage.setItem('user', this.userData);
              setTimeout(function () {
                location.reload();
              }, 1000);
            }
          }
        );
  }

  clickResetPassword() {
  const userdetails = <HTMLInputElement> document.getElementById('remember-credential');
  this.authService.resetPassword(userdetails.value).subscribe(
    data => {
      if (data['success']) {
        this.reset_success = 'A password confirmation has been sent to your email';
        return;
      }
      if (data['error']) {
        this.reset_error = 'Ooops! No User associated with inputted email';
        return;
      }
    }
  );
  }


  clearErrors() {
    this.register_errors = undefined;
    this.register_validation_errors = undefined;
    this.signin_errors = undefined;
    this.signin_validation_errors = undefined;
    this.register_errors = undefined;
  }

  saveToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const decodedToken = JSON.parse(window.atob(base64));
    localStorage.setItem('token', token);
  }
}
