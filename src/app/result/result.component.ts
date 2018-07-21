import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from '../app.service';
declare var $;
export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  questions = [''];
  showAnswers = false;
  errorAlert;
  results = {
  };
  pastResults = new Array();
  noPastResults;
  lastData;
  subject;
  i;

  previous(i) {
    if (this.i !== 0) {
      this.i = i - 1;
      return;
    }
      $.notify('This is the first');
  }
    next(i) {
      if (this.questions.length - 1 !== this.i) {
        this.i = i + 1;
        return;
      }
      $.notify('This is the last');
  }
  @HostListener('window:keyup', ['$event'])
keyEvent(event: KeyboardEvent) {
  console.log(event);
  if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
    this.next(this.i);
  }

  if (event.keyCode === KEY_CODE.LEFT_ARROW) {
    this.previous(this.i);
  }
}

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    // this.appService.loadScriptPage(this.scripts);
    this.results = this.appService.getResults();
    this.questions = this.results['questions'];
    console.log(this.questions);
    this.subject = this.getSubjectName(this.questions[1]['type']);
    this.getPastResults();
  }

  getSubjectName(subject) {
    if (subject === 'MAT') {
      return 'Mathematics';
    }
    if (subject === 'ENG') {
      return 'English Language';
    }
    if (subject === 'GEN') {
      return 'General Paper';
    }
  }

  save() {
    let lastData;
    if (this.pastResults === undefined) {
      lastData = undefined;
    } else {
      lastData = this.pastResults[0];
    }
    const subject = this.results['subject'];
    const score = this.results['score'];
    const percentage = this.results['percentage'];
    const uniqueKey = this.results['randomGen'];
    if (lastData !== undefined) {
      if (lastData['uniqueKey'] === uniqueKey) {
        this.errorAlert = ('Ooops! This result was previously saved nah');
        console.log(this.errorAlert);
        return;
      }
    }
    const body = {
      subject: subject,
      score: score,
      percentage: percentage,
      uniqueKey: uniqueKey
    };
     this.appService.saveResult(body).subscribe(
       data => {
         if (data['success']) {
           this.noPastResults = undefined;
           if (this.pastResults === undefined) {
            this.pastResults.push(body);
           } else {
            this.pastResults.unshift(body);
           }
         }
       }
     );
  }

  getPastResults() {
    this.appService.getPastResults().subscribe(
      data => {
        if (data['results'].length > 0) {
          this.pastResults = data['results'];
          return;
        }
        if (data['results'].length === 0) {
          this.noPastResults = 'You dont have saved result yet!';
        }
      }
    );
  }

  deleteResult(index) {
    const questionId = this.pastResults[index]['uniqueKey'];
    this.appService.deleteResult(questionId).subscribe(
      data => {
        if (data['success']) {
          this.pastResults.splice(index, 1);
          if (this.pastResults.length === 0) {
            this.noPastResults = 'You dont have saved result yet!';
          }
        return;
        }
        if (data['error']) {
          $.notify({
            icon: 'fas fa-exclamation',
            message: data['error']
          }, {
            type: 'danger'
          });
          console.log();
        }
      }
    );
  }






}
