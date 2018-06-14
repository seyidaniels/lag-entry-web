import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {
  timeElement: string;
  timeElapsed: number;

  @Output() timeup = new EventEmitter<string>();

  constructor(
  ) { }

  @ViewChild('timer') timer;

  ngOnInit() {
    this.timeElapsed = 1801;
    const that = this;
    setInterval(
      function() { that.timerFunction(); },
      1000
    );
  }

  timerFunction(): void {
    this.timeElapsed--;
    if (this.timeElapsed <= 1200) {
      this.timer.nativeElement.classList.add('bg-gd-sun');
      this.timer.nativeElement.classList.remove('bg-corporate');
    }
    if (this.timeElapsed <= 600) {
      this.timer.nativeElement.classList.remove('bg-gd-sun');
      this.timer.nativeElement.classList.add('bg-danger');
    }
    if (this.timeElapsed <=  0) {
      this.timeElement = 'Times Up';
      this.timeup.emit(this.timeElement);
      return;
    }
    let minutes: any = Math.floor(this.timeElapsed / 60);
    let seconds: any = (this.timeElapsed % 60);
    minutes = (minutes < 10) ? ( '0' + minutes) : minutes;
    seconds = (seconds < 10) ? ( '0' + seconds) : seconds;
    this.timeElement = minutes + ':' + seconds;
  }

}
