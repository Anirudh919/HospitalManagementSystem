import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {

  Patients: any = [];
  constructor(private _api: ServiceService) { }

  ngOnInit(): void {
    this.ReadPatient();
  }


  ReadPatient() {
    this._api.PatientsDetail().subscribe((data: any) => {
      this.Patients = data;
      console.log(this.Patients);
    });
  }




}
