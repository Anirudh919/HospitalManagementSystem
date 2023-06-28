import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {

  Appointment: any = [];
  // Doctor: any = [];
  // Patient: any = [];

  constructor(private _api: ServiceService) { }

  ngOnInit(): void {
    this.ReadAppointment();
    // this.ReadPatientID();
    // this.ReadDoctor();
  }

  ReadAppointment() {
    this._api.AppointmentsDetail().subscribe((data: any) => {
      this.Appointment = data;
      console.log(this.Appointment);
    })
  }

  // ReadPatientID() {
  //   this._api.PatientsDetailbyID().subscribe((data: any) => {
  //     this.Patient = data;
  //   })
  // }

  // ReadDoctor() {
  //   this._api.DoctorsDetailbyID().subscribe(data => {
  //     this.Doctor = data;
  //   })
  // }

  DeleteAppointmentDetail(Appointment: { AppointmentID: any }, index: any) {
    if (window.confirm('Are You Sure?')) {
      this._api.deleteAppointment(Appointment.AppointmentID).subscribe((data) => {
        this.Appointment.splice(index, 1);
      });
    }
  }
}
