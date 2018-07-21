
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Validation} from '../Validation';
import { AppService } from '../app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private valid: Validation, private appService: AppService) { }

  userData;
  editProfile;
  stats;
  changePword;
  updateForm;
  changePwordForm;
  update_errors;
  update_success;
  password_errors;
  password_success;
  password_validation_errors;
  update_validation_errors;
  statistics = [''];


  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.setupdateForm();
    this.setupChangePwordForm();
    this.getStats();
  }

  getStats() {
    this.appService.getProfileStatistics().subscribe(
      data  => {
        if (data['stats']) {
          this.statistics = data['stats'];
          console.log(this.statistics);
        }
      }
    );
  }

  setupdateForm() {
    this.updateForm = new FormGroup({
      fullname: new FormControl(this.userData['fullname']),
      username: new FormControl(this.userData['username']),
      email: new FormControl(this.userData['email']),
      course: new FormControl(this.userData['course']),
      jambScore: new FormControl(this.userData['jambScore'])
    });
  }

  setupChangePwordForm() {
    this.changePwordForm = new FormGroup({
      current_password: new FormControl(),
      password : new FormControl(),
      password_confirmation : new FormControl()
    });
  }

  clickChangePword() {
    this.changePword = true;
    this.stats = false;
    this.editProfile = false;
  }
  clickEditProfile() {
    this.changePword = false;
    this.stats = false;
    this.editProfile = true;
  }
  submitUpdateForm(value) {
    this.clearErrors();
    if (!this.valid.validate(value)) {
      this.update_errors = 'Incomplete Credentials';
      return;
    }
      this.appService.updateProfile(value).subscribe(
        data => {
          if (data['validation_errors']) {
            this.update_validation_errors = data['validation_errors'];
          }
          if (data['message']) {
            this.update_success = 'Profile Update Successful';
            return;
          }
        }
      );
    }

  submitchangePwordForm(value) {
    this.clearErrors();
    if (!this.valid.validate(value)) {
      this.password_errors = 'Incomplete Credentials';
      return;
    }
      this.appService.changePassword(value).subscribe(
        data => {
          if (data['validation_errors']) {
            this.password_validation_errors = data['validation_errors'];
          }
          if (data['error']) {
            this.password_errors = data['error'];
            return;
          }
          if (data['message']) {
            this.password_success = 'Password succesfully changed, You will be signed out in the next two seconds';
            this.password_success = this.password_success.concat('Kindly use your new password to login');
            localStorage.removeItem('token');
            setTimeout(function () {
              location.reload();
            }, 3000);
            return;
          }
        }
      );
    }


    clearErrors() {
      this.update_errors = undefined;
      this.update_validation_errors = undefined;
      this.password_errors = undefined;
      this.password_validation_errors = undefined;
    }

}
