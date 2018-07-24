import { Component, OnInit, HostListener} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { AppService } from '../app.service';
import {NgProgress} from 'ngx-progressbar';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operators';
import {ExamObject} from '../exam/examobject';

declare var $;
export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  staticAlertClosed = false;
  value = 'danger';
  name = 'Seyi Daniels';
  subject;
  number;
  i = 0;
  successMessage;
  correctAnswers: any;
  questions = new Array(0);
  private _success = new Subject<string>();
  userAnswer = new Array(this.questions.length);
  exam: ExamObject;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.next(this.i);
    }
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.previous(this.i);
    }
  }

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private progressService: NgProgress,
    private router: Router
  ) {
    this.exam = new ExamObject(this.questions, this.userAnswer, this.subject, this.i, this.appService, this.router);
  }

  ngOnInit() {
    console.log(this.questions.length);
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this.route.params.switchMap(
      (params: Params) => {
        this.subject = params['subject'];
        this.number = params['number'];
        if (typeof params['number'] !== 'undefined' &&
          params['number'] !== null) {
            this.progressService.start();
              setTimeout(() => {
                this.progressService.set(0.1);
              }, 500);
              setTimeout(() => {
                this.progressService.inc(0.2);
              }, 500);
              if (this.subject !== 'all' && this.number !== 30) {
                return this.appService.getQuestions(this.subject, this.number);
              } else {
                return this.appService.getAllComb();
              }
        }
      }
    ).subscribe(
      data => {
        this.progressService.done();
        this.questions = data['questions'];
        return;
      }
      );
      this._success.subscribe((message) => this.successMessage = message);
      this._success.pipe(
        debounceTime(5000)
      ).subscribe(() => this.successMessage = null);
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
    this._success.next(`This is the last question`);
}

previous(i) {
  if (this.i !== 0) {
    this.i = i - 1;
    return;
  }
    this._success.next(`This is the first question `);
}
toQuestion (i) {
  this.i = i;
}
submit() {
  $('#modal-slideup').modal('show');
}
makeid() {
  let text = '';
 const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 10; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

getSubjectName() {
  let subject;
  switch (this.subject) {
    case 'MAT' : subject = 'Mathematics';
    break;
    case 'ENG': subject =  'English Language';
    break;
    case 'GEN': subject =  'General Paper';
    break;
    case 'all': subject =  'All Subjects';
    break;
    default: subject =  null;
  }
  return subject;
}
confirmSubmit() {
  const randomGen = this.makeid();
  const score = this.calculate();
  const percentage = (score / this.number) * 100;
  this.appService.saveAnswerResult(this.questions, this.userAnswer, score, this.getSubjectName(), randomGen, percentage);
  this.router.navigate(['result', randomGen]);
}


reset() {
  alert('Are your sure you wanna reset?');
  this.userAnswer = [];
  this.i = 0;
}
}
