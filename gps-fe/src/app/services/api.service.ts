import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {User} from "../interfaces/auth";
import {CookieService} from "./cookie.service";
import {throwError} from "rxjs";
import {GpsIndex} from "../interfaces/gps";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:9000'
  private requestHeaders = { headers:
      new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.cookieService.getCookie('token')}`
      })
  };

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  // handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // };

  register(user: User) {
    return this.http.post(`${this.apiUrl}/users/register`, {
      email: user.email,
      username: user.username,
      password: user.password,
      full_name: user.fullName,
      role: "USER"
    }, this.requestHeaders);
  }

  login(user: User) {
    return this.http.post(`${this.apiUrl}/users/login`, {
      username: user.username,
      password: user.password
    });
  }

  getGpsIndex() {
    return this.http.get<any>(`${this.apiUrl}/gpses`, this.requestHeaders)
      .toPromise()
      .then(response => response)
      .catch(error => error)
  }

  logout() {
    return this.http.post(`${this.apiUrl}/users/logout`, {}, this.requestHeaders);
  }
}
