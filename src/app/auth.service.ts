import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import {  of } from 'rxjs/observable/of';
import 'Rxjs/rx';


const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }


  signIn(details) {
    const body = JSON.stringify(details);
    return this.http.post('http://localhost:8000/api/auth/sign-in', body, {headers: headers})
      .pipe(
        catchError(this.handleError('getQuotes', []))
      );
  }

  signUp(details) {
    const body = JSON.stringify(details);
    return this.http.post('http://localhost:8000/api/auth/sign-up', body, {headers: headers})
      .pipe(
        catchError(this.handleError('getQuotes', []))
      );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    const token = this.getToken();
    const body = JSON.stringify({token: token});
    return this.http.post('http://localhost:8000/api/logout', body, {headers: headers})
    .pipe(
      catchError(this.handleError('getQuotes', []))
    );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error.error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
