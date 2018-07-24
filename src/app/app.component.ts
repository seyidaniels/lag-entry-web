import { Component, OnInit } from '@angular/core';
import {NgProgress} from 'ngx-progressbar';
import {Http} from '@angular/http';
import { AppService } from './app.service';
import {Router} from '@angular/router';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  posts;
  loggedIn;
  userData;
  username;


  dashboardScripts = [
    'assets/js/pages/chart.min.js',
    'assets/js/pages/dashboard.js'
  ];

  constructor(
    private progressService: NgProgress, private http: Http,
    private appService: AppService,
    private router:  Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.loggedIn = true;
      this.userData = JSON.parse(localStorage.getItem('user'));
      this.username = this.userData.username;
      this.router.navigate(['dashboard']);
     this.appService.loadScriptPage(this.dashboardScripts);
      return;
    }

  }

  doLogin(value) {
    this.loggedIn = value;
  }

  signOut() {
    this.authService.logout().subscribe(
      data => {
        if (data['message']) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.loggedIn = false;
          location.href = 'index.html';
        }
      }
    );
  }

}
