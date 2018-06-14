import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  userData;
  editProfile;
  stats = true;
  changePword;

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user'));
  }

  clickChangePword() {
    console.log('Change Pword Clicked');
    this.changePword = true;
    this.stats = false;
    this.editProfile = false;
  }
  clickEditProfile() {
    console.log('Edit Profile Clicked');
    this.changePword = false;
    this.stats = false;
    this.editProfile = true;
  }

}
