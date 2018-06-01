import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { AppService } from '../app.service';
import {NgProgress} from 'ngx-progressbar';
declare var $;
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private progressService: NgProgress,
  ) { }

  alert;
  name = 'Seyi Daniels';
  subject;
  number;
  i = 0;
  staticAlertClosed = false;
  correctAnswers: any;

  questions = [''];

  userAnswer = new Array(this.questions.length);


//   addMinutes(date, minutes) {
//     return new Date(date.getTime() + minutes * 60000);
// }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);
    console.log(this.questions);
    console.log(this.name);
    this.route.params.switchMap(
      (params: Params) => {
        this.subject = params['subject'];
        this.number = params['number'];
        if (typeof params['number'] !== 'undefined' &&
          params['number'] !== null) {
            console.log(this.subject, this.number);
            this.progressService.start();
              setTimeout(() => {
                this.progressService.set(0.1);
              }, 500);
              setTimeout(() => {
                this.progressService.inc(0.2);
              }, 500);
         return this.appService.getQuestions(this.subject, this.number);
        }
      }
    ).subscribe(
      data => {
        console.log(data['questions'].length);
        this.progressService.done();
        this.questions = data['questions'];
        console.log(this.questions);
        return;
      }
      );
  this.alert = 'Error Fetching Questions';
        return;
  }
  calculate(): number {
    let count = 0;
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i]['answer'] ===  this.userAnswer[i]) {
        count = count + 1;
      }
    }
    return count;
  }


  next(i) {
    if (this.questions.length - 1 !== this.i) {
      this.i = i + 1;
      return;
    }
    this.alert = 'This is the last question';
}

previous(i) {
  if (this.i !== 0) {
    this.i = i - 1;
    return;
  }
    this.alert = 'This is the first question';
}

toQuestion (i) {
  this.i = i;
}



submit() {
 console.log(this.calculate());
}




reset() {
  alert('Are your sure you wanna reset?');
  this.userAnswer = [];
  this.i = 0;
}


getSubjectName() {
  if (this.subject === 'MAT') {
    return 'Mathematics';
  }
  if (this.subject === 'ENG') {
    return 'English Language';
  }
  if (this.subject === 'GEN') {
    return 'General Paper';
  }
}
}
