import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { AppService } from '../app.service';
import {Router} from '@angular/router';
declare var $;

@Component({
  selector: 'app-mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.css']
})
export class MockComponent implements OnInit {

  constructor(
    private appService: AppService,
    private router: Router
  ) { }
  welcomepage = true;
  number;
  timeup;
  error;
  questions = [''];
  userAnswer = new Array(this.questions.length);
  correctanswers = new Array();
  i = 0;
  private _success = new Subject<string>();

  ngOnInit() {
   this.appService.getMockQuestions().subscribe(
    data => {
      this.questions = data['questions'];
    }
  );
  this.timeUp(this.timeup);
  }


  startMock() {
    // Check if User has a waec and jamb result;
    const user = JSON.parse(localStorage.getItem('user'));
    if (localStorage.getItem('waec_'.concat(user.id))  && user.jambScore  ) {
      this.welcomepage = !this.welcomepage;
    } else {
      this.error = 'Ooops! You must have a waec and jamb result saved';
    }
  }

  next(i) {
    if (this.questions.length - 1 !== this.i) {
      this.i = i + 1;
      return;
    }
    this._success.next(`This is the last question`);
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



confirmSubmit() {
  const randomGen = this.makeid();
  const score = this.calculate();
  const percentage = (score / 50) * 100;
  // const aggregate;
  this.appService.saveAnswerResult(this.questions, this.userAnswer, score, 'mock', randomGen, percentage);
  const body = {
    score: score,
    percentage: percentage,
    // aggregate: aggregate,
    uniqueKey: randomGen
  };
  this.appService.saveMock(body);
  this.router.navigate(['mock-result', randomGen]);
}


calculate(): number {
  let count = 0;
  for (let i = 0; i < this.questions.length; i++) {
    if (this.questions[i]['answer'] ===  this.userAnswer[i]) {
      count = count + 1;
      this.correctanswers.push(i);
    }
  }
  return count;
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

reset() {
  alert('Are your sure you wanna reset?');
  this.userAnswer = [];
  this.i = 0;
}

timeUp(selected: string) {
  if (selected) {
   this.timeup = selected;
   if (this.timeup === 'Times Up') {
     this.confirmSubmit();
   }

  }
}


}
