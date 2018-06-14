import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operators';
import { AppService } from '../app.service';
import {Router} from '@angular/router';

export class ExamObject {
  private questions;
  private userAnswers;
  private subject;
  private i;
  private _success = new Subject<string>();
  private successMessage;
  private appService: AppService;
  private router: Router;

  constructor(
      questions, userAnswers, subject, i , appService, router
  ) {
    this.questions = questions;
    this.userAnswers = userAnswers;
    this.subject = subject;
    this.i = i;
    this.appService = appService,
    this.router = router;
  }



  calculate(): number {
    let count = 0;
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i]['answer'] ===  this.userAnswers[i]) {
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
    return this._success.next(`This is the last question`);
}

previous(i) {
  if (this.i !== 0) {
    this.i = i - 1;
    return;
  }
    return this._success.next(`This is the first question `);
}
toQuestion (i) {
  this.i = i;
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
  let new_subject;
  switch (this.subject) {
    case 'MAT' : new_subject = 'Mathematics';
    break;
    case 'ENG': new_subject =  'English Language';
    break;
    case 'GEN': new_subject =  'General Paper';
    break;
    case 'all': new_subject =  'All new_subjects';
    break;
    default: new_subject =  null;
  }
  return new_subject;
}
confirmSubmit() {
  const randomGen = this.makeid();
  const dateSubmitted = new Date().getDate();
  const score = this.calculate();
  const percentage = (score / this.questions.length) * 100;
  this.appService.saveAnswerResult(this.questions, this.userAnswers, score, this.getSubjectName(), randomGen, percentage);
  this.router.navigate(['result', randomGen]);
}
reset() {
  alert('Are your sure you wanna reset?');
  this.userAnswers = [];
  this.i = 0;
}



}
