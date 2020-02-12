import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LoginResponse } from '../_models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // basePath : определить путь API.
  basePath = 'https://angular.propan.top/autorization/';
 
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }
 
  // httpOptions : Объект Option для установки заголовков HTTP.
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
 
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
 
 
  // loginForm : метод для отправки HTTP-звонка в API с информацией об электронной почте и пароле . Этот метод будет вызываться со страницы входа в систему.
  loginForm(data): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.basePath + 'api.php', data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
 
  // setUser : После успешной аутентификации сервер учетных данных вернет дополнительную информацию о пользователе с помощью JSON Web Token, который мы сохраним в локальном хранилище браузера для дальнейшего использования.
  //если админ, то в админку и тп.
  setUser(resp: LoginResponse) {

    localStorage.setItem('user_id', resp.user_id);   
    localStorage.setItem('name', resp.name);
    localStorage.setItem('access_token', resp.access_token);
    localStorage.setItem('type', resp.type);
    console.log('setUser',resp.type);

    if(resp.type==='visitor'){
        this.router.navigate(['/user-dashboard']);
    }
    else if(resp.type==='admin'){
      this.router.navigate(['/admin-dashboard']);
    }

  }
  // isLoggedIn : этот метод будет проверять только то, установлен ли токен пользователя в localStorage.
  isLoggedIn() {
    return localStorage.getItem('access_token') != null;
  }

  isLoggedInType() {
    return localStorage.getItem('type');
  }
 
  // After clearing localStorage redirect to login screen
  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
 
 
  // Get data from server for Dashboard
  getData(data): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.basePath + 'api.php', data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
 
}
/*

basePath : определить путь API.

httpOptions : Объект Option для установки заголовков HTTP.
handleError: Метод обработки ошибок клиента или сервера, я получил его из Angular Docs.

loginForm : метод для отправки HTTP-звонка в API с информацией об электронной почте и пароле . Этот метод будет вызываться со страницы входа в систему.

setUser : После успешной аутентификации сервер учетных данных вернет дополнительную информацию о пользователе с помощью JSON Web Token, который мы сохраним в локальном хранилище браузера для дальнейшего использования.

isLoggedIn : этот метод будет проверять только то, установлен ли токен пользователя в localStorage.
*/
