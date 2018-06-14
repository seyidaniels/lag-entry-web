import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import {  of } from 'rxjs/observable/of';
import {Router} from '@angular/router';
const headers = new HttpHeaders({'Content-Type': 'application/json'});


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

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getUserDetails() {
    const token = this.getToken();
    return this.http.get('http://localhost:8000/api/get-user?token=' + token ).pipe(
      catchError(this.handleError('getQuotes', []))
    );
  }

  getQuestions (subject, number): Observable<any> {
    const token = this.getToken();
    const body = {
      subject: subject,
      number: number
    };
    return this.http.post('http://localhost:8000/api/get-questions?token=' + token, body, {headers: headers})
      .pipe(
        catchError(this.handleError('getQuotes', []))
      );
  }

  getAllComb() {
    const token = this.getToken();
    return this.http.get('http://localhost:8000/api/test-all?token=' + token)
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
    const token = this.getToken();
    return this.http.delete('http://localhost:8000/api/delete-result/' + uniqueKey + '?token=' + token ).pipe(
      catchError(this.handleError('getQuotes', []))
    );
  }

  getResults() {
    return this.sharedData;
  }

  getPastResults() {
    const token = this.getToken();
    return this.http.get('http://localhost:8000/api/past-results?token=' + token ).pipe(
      catchError(this.handleError('getQuotes', []))
    );
  }

  saveResult(body) {
    const token = this.getToken();
    return this.http.post('http://localhost:8000/api/save-result?token=' + token, body, {headers: headers} ).pipe(
      catchError(this.handleError('getQuotes', []))
    );
  }

  getMockQuestions() {
    const token = this.getToken();
    return this.http.get('http://localhost:8000/api/get-mock-questions?token=' + token)
      .pipe(
        catchError(this.handleError('getQuotes', []))
      );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error['status']); // log to console instead
      if (error['status'] === 401) {
        localStorage.removeItem('token');
        location.reload();
        return;
      }
      if (error['status'] ===  500) {
        this.router.navigate(['server-error']);
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

  getToken() {
    return localStorage.getItem('token');
  }



}
