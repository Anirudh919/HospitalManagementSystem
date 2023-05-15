import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent implements OnInit{
Doctors: any =[];

  constructor(private _api: ServiceService) {}

  ngOnInit(): void {
    this.ReadDoctors();
  }

  ReadDoctors() {
    this._api.DoctorsDetail().subscribe((data: any) => {
      this.Doctors = data;
      console.log(this.Doctors);
    });
  }

  DeleteDoctorDetail(Doctors: { DoctorID: any }, index: any) {
    if (window.confirm('Are You Sure?')) {
      this._api.deleteDoctor(Doctors.DoctorID).subscribe((data) => {
        this.Doctors.splice(index, 1);
      });
    }
  }
}
