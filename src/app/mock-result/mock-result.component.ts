import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import * as html2canvas from 'html2canvas';
declare var $: any;
export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}


@Component({
  selector: 'app-mock-result',
  templateUrl: './mock-result.component.html',
  styleUrls: ['./mock-result.component.css']
})
export class MockResultComponent implements OnInit {
  i = 0;
  questions = [''];
  showAnswers = false;
  userAnswers;
  errorAlert;
  results = {
  };
  pastResults = new Array();
  noPastResults;
  lastData;
  subject;
  constructor(
    private appService: AppService
  ) { }
  ngOnInit() {
    this.results = this.appService.getResults();
    this.questions = this.results['questions'];
    this.userAnswers = this.results['answers'];
    this.getPastResults();
    console.log(this.questions);
  }

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

  share() {
    console.log('fhfhf');
    html2canvas(document.body).then(function() {
     console.log('donre');
  });
  }

}
