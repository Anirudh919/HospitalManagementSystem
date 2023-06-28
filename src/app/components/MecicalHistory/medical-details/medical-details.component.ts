import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-medical-details',
  templateUrl: './medical-details.component.html',
  styleUrls: ['./medical-details.component.css']
})
export class MedicalDetailsComponent implements OnInit {
  MedicalHistory: any = [];


  constructor(private _api: ServiceService) { }

  ngOnInit(): void {
    this.ReadMedicals();
  }


  ReadMedicals() {
    this._api.MedicalsDetail().subscribe((data: any) => {
      this.MedicalHistory = data;
      console.log(this.MedicalHistory);
    });
  }

}
