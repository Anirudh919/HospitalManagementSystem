import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {
  editForm!: FormGroup;
  submitted = false;

  constructor(
    private datepipe: DatePipe,
    public Form: FormBuilder,
    private actRoute: ActivatedRoute,
    private _api: ServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getPatient(id);

    this.editForm = this.Form.group({
      PatientID: [id],
      PatientName: [''],
      Address: [''],
      PhoneNumber: [''],
      Email: [''],
      Gender: [''],
      DateOfBirth: [''],

    });
  }

  getPatient(id: any) {
    this._api.Getdetailpatient(id).subscribe((data) => {
      this.editForm.patchValue({
        PatientName: data['PatientName'],
        Address: data['Address'],
        PhoneNumber: data['PhoneNumber'],
        Email: data['Email'],
        Gender: data['Gender'],
        DateOfBirth: this.datepipe.transform(data['DateOfBirth'], 'yyyy-MM-dd'),

      });
    });
  }

  onSubmit() {
    this.submitted = true;

    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('Patient');
        this._api.UpdatePatient(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/patient');
            console.log('Content updated successfully!');
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
      return true;
    }
  }
}
