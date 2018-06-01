import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  constructor() { }

  endTime = {
    minutes: 0,
    seconds: 0
  };

  ngOnInit() {
    this.datTime();
  }

  datTime() {
    // Set the date we're counting down to
  const countDownDate = new Date('Sep 5, 2018 15:37:25').getTime();

  // Update the count down every 1 second
  const x = setInterval(function() {
    // Get todays date and time
    const now = new Date().getTime();
    // Find the distance between now an the count down date
    const distance = this.countDownDate - this.now;
    // Time calculations for days, hours, minutes and seconds
     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
     const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    // Display the result in the element with id='demo'
    document.getElementById('demo').innerHTML = days + 'd ' + hours + 'h '
    + minutes + 'm ' + seconds + 's ';
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(this.x);
      document.getElementById('demo').innerHTML = 'EXPIRED';
    }
  }, 1000);
  }


  quizTime() {
    const date = new Date();
  const currentTime = date.getTime();
  const endTime = currentTime + 30 - 60000;
  return endTime - currentTime;
  }


}
