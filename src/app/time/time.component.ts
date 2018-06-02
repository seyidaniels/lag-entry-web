import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  constructor() { }

 minutes;
 seconds;
 dateObj = new Date();
 month = this.dateObj.getUTCMonth() + 1; //months from 1-12
day = this.dateObj.getUTCDate();
year = this.dateObj.getUTCFullYear();

  ngOnInit() {
    this.countTime();
  }

  countTime() {
    const startDate = new Date(2018, 11, 25).getTime();
    const endTime = new Date().getTime();
    const distance = startDate - endTime;
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s =  Math.floor((distance % (1000 * 60)) / 1000);
    this.minutes = m;
    this.seconds = s;
    document.getElementById('minutes').textContent = ' ' + m;
    document.getElementById('seconds').textContent = ' ' + s;
    setInterval(this.countTime, 1000);
  }











  // quizTime() {
  // const date = new Date();
  // const currentTime = date.getTime();
  // const endTime = currentTime + 30 * 60000;
  // return endTime - currentTime;
  // }


}
