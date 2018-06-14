import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit  {
  array = [];
  sum = 10;
  throttle = 300;
  scrollDistance = 1;
  direction = '';
  modalOpen = false;
  data = [''];
  scrolled;

  constructor(
    private appService: AppService
  ) {
  }

  ngOnInit() {
    this.appService.getMockQuestions().subscribe(
            data => {
              this.data = data['questions'];
              for (let i = 0; i < this.sum; i++) {
                this.array.push(this.data[i]);
              }
            }
          );
  }



  addItems(startIndex, endIndex, _method) {
    for (let i = 0; i < this.sum; ++i) {
      this.array[_method]([i, ' ', this.data[i]].join(''));
    }
  }
  appendItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, 'push');
  }
  prependItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, 'unshift');
  }

  onScrollDown (ev) {
    const start = this.sum;
    this.sum += 10;
    for (let i = start; i < this.sum; i++) {
      if (this.data[i]) {
          this.scrolled = true;
          this.array.push(this.data[i]);
          this.scrolled = false;
      } else {
        break;
      }
    }
    this.direction = 'down';
  }
}
