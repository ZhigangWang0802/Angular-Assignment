import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = "https://localhost:44358/token";
  private userUrl = "https://localhost:44358/api/account";
  
  constructor(private http: HttpClient) { }
  
  login(login): Observable<any> {
    var data = "Username=" + login.username + "&Password=" + login.password + "&grant_type=password";
    return this.http.post(this.authUrl, data, httpOptions).pipe(
    catchError(this.handleError));
  }
  register(register) {
    var data="Email=" + register.email + "&Password=" + register.password + "&confirmPassword=" + register.confirmPassword;
    return this.http.post(`${this.userUrl}/register`, data, httpOptions);
  }
  signout(): Observable<any> {
    return this.http.post(`${this.userUrl}/logout`, httpOptions);
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
}
}
const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/x-www-form-urlencoded',
  })
};
