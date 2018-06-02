import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import {  of } from 'rxjs/observable/of';
const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable()
export class AppService {

  sharedData = {
    questions: [],
    answers: [],
    score: 0,
    token: 0
  };

  constructor(private http: HttpClient) { }


  getQuestions (subject, number): Observable<any> {
    return this.http.get('http://localhost:8000/api/get-questions/' + subject + '/' + (number), {headers: headers})
      .pipe(
        catchError(this.handleError('getQuotes', []))
      );
  }


  saveAnswerResult(questions, answers, score, randomGen) {
    this.sharedData.questions = questions;
    this.sharedData.answers = answers;
    this.sharedData.score = score;
    this.sharedData.token = randomGen;
    console.log(this.sharedData);
  }

  getResults() {
    return this.sharedData;
  }



  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
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
