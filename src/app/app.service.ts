import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import {  of } from 'rxjs/observable/of';
import {Router} from '@angular/router';
const headers = new HttpHeaders({'Content-Type': 'application/json'});
declare var $;


@Injectable()
export class AppService {

  sharedData = {
    questions: [],
    answers: [],
    score: 0,
    subject: '',
    randomGen: 0,
    percentage: 0,
    correctanswers: []
  };

  private token;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.token = localStorage.getItem('token');
   }

  getQuestions (subject, number): Observable<any> {
    const body = {
      subject: subject,
      number: number
    };
    return this.http.post('http://lagpostume.com/api/get-questions?token=' + this.token, body, {headers: headers})
      .pipe(
        catchError(this.handleError('getQuotes', []))
      );
  }

  getAllComb() {
    return this.http.get('http://lagpostume.com/api/test-all?token=' + this.token)
      .pipe(
        catchError(this.handleError('getQuotes', []))
      );
  }


  saveAnswerResult(questions, answers, score, subject, randomGen, percentage) {
    this.sharedData.questions = questions;
    this.sharedData.answers = answers;
    this.sharedData.score = score;
    this.sharedData.subject = subject;
    this.sharedData.randomGen = randomGen;
    this.sharedData.percentage = percentage;
  }

  deleteResult(uniqueKey) {
    return this.http.delete('http://lagpostume.com/api/delete-result/' + uniqueKey + '?token=' + this.token ).pipe(
      catchError(this.handleError('getQuotes', []))
    );
  }

  getResults() {
    return this.sharedData;
  }

  getPastResults() {
    return this.http.get('http://lagpostume.com/api/past-results?token=' + this.token ).pipe(
      catchError(this.handleError('getQuotes', []))
    );
  }

  updateProfile(body) {
    return this.http.put('http://lagpostume.com/api/update-profile?token= ' + this.token, body, {headers: headers}).pipe(
      catchError(this.handleError('getQuotes', []))
    );
  }

  changePassword(body) {
    return this.http.put('http://lagpostume.com/api/change-password?token= ' + this.token, body, {headers: headers}).pipe(
      catchError(this.handleError('getQuotes', []))
    );
  }

  saveResult(body) {
    return this.http.post('http://lagpostume.com/api/save-result?token=' + this.token, body, {headers: headers} ).pipe(
      catchError(this.handleError('getQuotes', []))
    );
  }

  saveMock(body) {
    return this.http.post('http://lagpostume.com/api/save-mock-result?token=' + this.token, body, {headers: headers} ).pipe(
      catchError(this.handleError('getQuotes', []))
    );
  }

  getMockQuestions() {
    return this.http.get('http://lagpostume.com/api/get-mock-questions?token=' + this.token)
      .pipe(
        catchError(this.handleError('getQuotes', []))
      );
  }

  getMockResults () {
    return this.http.get('http://lagpostume.com/api/mock-results?token=' + this.token)
      .pipe(
        catchError(this.handleError('getQuotes', []))
      );
  }

  getProfileStatistics () {
    return this.http.get('http://lagpostume.com/api/profile-stat?token=' + this.token)
      .pipe(
        catchError(this.handleError())
      );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      if ( error['status'] === 0) {
        $.notify({message: 'Ooops a server has error occured! Check your internet settings!' }, { type: 'danger'});
        return;
      }

      if (error['status'] === 401) {
        localStorage.removeItem('token');
        location.reload();
        return;
      }
      if (error['status'] ===  500) {
        $.notify({message: 'Ooops a server has error occured! Try Again!' }, { type: 'danger'});
        console.log(error);
        return;
      }
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  loadScriptPage(dynamicScripts) {
    let isFound = false;
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
        isFound = true;
      }
    }
    if (!isFound) {
      for (let i = 0; i < dynamicScripts.length; i++) {
        const node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementById('scripts_page').appendChild(node);
        document.getElementById('scripts_page').appendChild(node);
        document.getElementById('scripts_page').appendChild(node);
        document.getElementById('scripts_page').appendChild(node);
      }
    }
  }
}
