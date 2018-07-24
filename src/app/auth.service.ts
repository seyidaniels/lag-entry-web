import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import {  of } from 'rxjs/observable/of';
import 'Rxjs/rx';


const headers = new HttpHeaders({'Content-Type': 'application/json'});
const url = 'http://lagpostume.com/api/auth/';

declare var $: any;

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }


  signIn(details) {
    const body = JSON.stringify(details);
    return this.http.post(url + 'sign-in', body, {headers: headers})
      .pipe(
        catchError(this.handleError('getQuotes', []))
      );
  }

  signUp(details) {
    const body = JSON.stringify(details);
    return this.http.post(url + 'sign-up', body, {headers: headers})
      .pipe(
        catchError(this.handleError('getQuotes', []))
      );
  }
  resetPassword(data) {
    return this.http.get(url + 'resetPassword/' + data, {headers: headers})
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
    return this.http.post('http://lagpostume.com/api/logout', body, {headers: headers})
    .pipe(
      catchError(this.handleError('getQuotes', []))
    );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error.error); // log to console instead
      $.notify({
        icon: 'fas fa-paw',
        message: 'Oooops!Server Error! Try Again'
      }, {
        type: 'danger'
      });
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
