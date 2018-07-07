import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-mock-result',
  templateUrl: './mock-result.component.html',
  styleUrls: ['./mock-result.component.css']
})
export class MockResultComponent implements OnInit {

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
  resultScripts = [
    'assets/js/pages/html2canvas.min.js',
  ];
  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.results = this.appService.getResults();
    this.questions = this.results['questions'];
    this.userAnswers = this.results['answers'];
    this.getPastResults();
    this.appService.loadScriptPage(this.resultScripts);
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
