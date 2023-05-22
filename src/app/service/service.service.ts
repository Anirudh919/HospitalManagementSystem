import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUri: string = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient) { }
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

  PatientsDetailbyID() {
    return this.http.get(`${this.baseUri}/patientsdetailbyid`);
  }

  DoctorsDetail() {
    return this.http.get(`${this.baseUri}/doctorsdetail`);
  }

  DoctorsDetailbyID() {
    return this.http.get(`${this.baseUri}/doctorsdetailbyid`);
  }

  DoctorsDetailOfAppointment() {
    return this.http.get(`${this.baseUri}/doctorsdetailofappointment`);
  }

  AppointmentsDetail() {
    return this.http.get(`${this.baseUri}/appointmentsdetail`);
  }

  AddAppointment(data: any): Observable<any> {
    let url = `${this.baseUri}/addappointment`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  Getdetaildoctor(id: any): Observable<any> {
    let url = `${this.baseUri}/doctor/${id}`;
    return this.http
      .get(url, { headers: this.headers })
      .pipe(map((res: any) => {
        return res[0] || {};
      }),
        catchError(this.errorMgmt));
  }

  Getdetailpatient(id: any): Observable<any> {
    let url = `${this.baseUri}/patient/${id}`;
    return this.http
      .get(url, { headers: this.headers })
      .pipe(map((res: any) => {
        return res[0] || {};
      }),
        catchError(this.errorMgmt));
  }

  UpdatePatient(id: any, data: any): Observable<any> {
    let url = `${this.baseUri}/PatientUpdate`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  UpdateDoctor(id: any, data: any): Observable<any> {
    let url = `${this.baseUri}/DoctorUpdate`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  deleteDoctor(id: any): Observable<any> {
    let url = `${this.baseUri}/doctordelete/${id}`;
    return this.http
      .put(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  deletePatient(id: any): Observable<any> {
    let url = `${this.baseUri}/patientdelete/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  deleteAppointment(id: any): Observable<any> {
    let url = `${this.baseUri}/appointmentdelete/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
}
