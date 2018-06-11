import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

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
  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    // this.appService.loadScriptPage(this.scripts);
    this.results = this.appService.getResults();
    this.questions = this.results['questions'];
    this.userAnswers = this.results['answers'];
    console.log(this.questions);
    this.subject = this.getSubjectName(this.questions[1]['type']);
    this.getPastResults();
    // const pastResults = this.db.list('/results').valueChanges();
    // pastResults.subscribe(
    //   data => {
    //     this.items = data;
    //   }
    // );
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
        console.log(data['results'].length);
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
          console.log(data['error']);
        }
      }
    );
  }
}
