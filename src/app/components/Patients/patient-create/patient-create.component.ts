import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})
export class PatientCreateComponent {
  submitted = false;

  PatientForm = this.Form.group({
    PatientName: [''],
    Address: [''],
    PhoneNumber: [''],
    Email: [''],
    Gender: [''],
    DateOfBirth: ['']
  })

  constructor(private _api: ServiceService, private Form: FormBuilder, private router: Router) {
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.PatientForm);
    if (!this.PatientForm.valid) {
      return false;
    } else {
      return this._api.AddPatient(this.PatientForm.value).subscribe({
        complete: () => {
          this.router.navigateByUrl('/patient');
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

}
