import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { map ,Observable,catchError, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUri:string='http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type','application/json')

  constructor(private http:HttpClient) { }
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage : ${error.message} `;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  Login(url: any, payload: any) {
    return this.http.post(`${this.baseUri}${url}`, payload).pipe(
      map((res) => {
        return res;
      })
    );
  }

  Register(url: any, payload: any) {
    return this.http.post(`${this.baseUri}${url}`, payload).pipe(
      map((res) => {
        return res;
      })
    );
  }
  
  PatientsDetail() {
    return this.http.get(`${this.baseUri}/patientsdetail`);
  }

  DoctorsDetail() {
    return this.http.get(`${this.baseUri}/doctorsdetail`);
  }

  AppointmentsDetail() {
    return this.http.get(`${this.baseUri}/appointmentsdetail`);
  }

  // AddDepartment(data:any): Observable<any>{
  //   // let url=`${this.baseUri}/addpatient`;
  //   // return this.http.post(url,data).pipe(catchError(this.errorMgmt));
  // }

  
  UpdateDoctor(id: any, data: any): Observable<any> {
    let url = `${this.baseUri}/DoctorUpdate`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  deleteDoctor(id: any): Observable<any> {
    let url = `${this.baseUri}/doctordelete/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
}
