import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, filter, find, single } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { IEmployee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<any>{
    let fakeRoute = this.getFakeRoute();
    return this.http.get<IEmployee []>(fakeRoute)
                    .pipe(map(
                        data => {return data['list']}),
                        catchError(error => {
                          return throwError(error.message);
                      }));
    
  }

  private getFakeRoute(){
    return 'assets/employee.json';
  }
}
