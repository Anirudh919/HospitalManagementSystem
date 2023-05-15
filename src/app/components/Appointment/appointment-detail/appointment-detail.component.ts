import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit{

  Appointment:any=[];
  constructor(private _api:ServiceService){}

  ngOnInit(): void {
    this.ReadAppointment();
  }

  ReadAppointment(){
    this._api.AppointmentsDetail().subscribe((data: any) => {
      this.Appointment = data;
      console.log(this.Appointment);
    })
  }
}
