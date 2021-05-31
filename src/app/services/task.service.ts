import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http"; 
import { ITask } from '../tasks/ITask';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskUrl = "https://localhost:44358/api/values";

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.taskUrl);
  }
  public getTask(id): Observable<any> {
    return this.http.get(`${this.taskUrl}/${id}`, httpOptions);
  }
  public postTask(data): Observable<any> {
    let formData = "QuoteID=" + data.QuoteID + "&QuoteType=" + data.QuoteType + "&Contact=" + data.Contact + "&Task=" + data.Task + "&DueDate=" + data.DueDate + "&TaskType=" + data.TaskType;
    return this.http.post(this.taskUrl, formData, httpOptions);
  }
  public putTask(id, data): Observable<any> {
    let formData = "QuoteID=" + data.QuoteID + "&QuoteType=" + data.QuoteType + "&Contact=" + data.Contact + "&Task=" + data.Task + "&DueDate=" + data.DueDate + "&TaskType=" + data.TaskType;
    return this.http.put(`${this.taskUrl}/${id}`, formData, httpOptions);
  }
  
  public deleteTask(id): Observable<any> {
    const deleteUrl = this.taskUrl+"/"+id;
    return this.http.delete(deleteUrl, httpOptions);
  }
}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded',
  })
};

