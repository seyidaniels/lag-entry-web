import { Component, OnInit } from '@angular/core';
import {NgProgress} from 'ngx-progressbar';
import {Http} from '@angular/http';
import { AppService } from './app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  posts;
  loggedIn = true;



  dashboardScripts = [
    'assets/js/pages/chart.min.js',
    'assets/js/pages/dashboard.js'
  ];

  constructor(
    private progressService: NgProgress, private http: Http,
    private appService: AppService,
    private router:  Router
  ) {}

  ngOnInit() {
    if (this.loggedIn) {
      this.router.navigate(['dashboard']);
      this.loader();
      this.appService.loadScriptPage(this.dashboardScripts);
    }

  }



  loader() {
     // This is a sample
     const sampleUrl = 'http://slowwly.robertomurray.co.uk/delay/6000/url/https://jsonplaceholder.typicode.com/posts/1';
     this.progressService.start();
     setTimeout(() => {
       this.progressService.set(0.1);
     }, 500);
     setTimeout(() => {
       this.progressService.inc(0.2);
     }, 500);
     this.http.get(sampleUrl)
       .subscribe((response) => {
         this.progressService.done();
         this.posts = response.json();
       });
  // Sample shaa
  }

}
