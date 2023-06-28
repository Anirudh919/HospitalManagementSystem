import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.css']
})
export class AppointmentAddComponent implements OnInit {

  submitted = false;
  DoctorDetail: any = [];
  PatientDetail: any = [];

  AppointmentForm = this.Form.group({
    PatientName: [''],
    Address: [''],
    PhoneNumber: [''],
    Gender: [''],
    DateOfBirth: [''],
    DoctorID: [''],
    AppointmentDate: [''],
    AppointmentTime: [''],
    AppointmentStatus: [''],
  })


  constructor(private _api: ServiceService, private Form: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.ReadDoctor();
    this.ReadPatient();
  }

  onSubmit() {
    this.submitted = true;
    if (!this.AppointmentForm.valid) {
      return false;
    } else {
      return this._api.AddAppointment(this.AppointmentForm.value).subscribe({
        complete: () => {
          this.router.navigateByUrl('/appointment');
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  ReadPatient() {
    this._api.PatientsDetail().subscribe(data => {
      this.PatientDetail = data;
    })
  }

  ReadDoctor() {
    this._api.DoctorsDetailOfAppointment().subscribe((data: any) => {
      this.DoctorDetail = data;
    })
  }

  Clear() {
    this.AppointmentForm.reset();
  }
}
