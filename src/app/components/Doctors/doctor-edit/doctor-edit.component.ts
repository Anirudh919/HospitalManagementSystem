import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css'],
})
export class DoctorEditComponent implements OnInit {
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
    this.getDoctor(id);

    this.editForm = this.Form.group({
      DoctorID: [id],
      DoctorName: [''],
      Address: [''],
      PhoneNumber: [''],
      Email: [''],
      Gender: [''],
      DateOfBirth: [''],
      Specialization: [''],
      Experience: [''],
      JobStatus: ['']
    });
  }

  getDoctor(id: any) {
    this._api.Getdetaildoctor(id).subscribe((data) => {
      this.editForm.patchValue({
        DoctorName: data['DoctorName'],
        Address: data['Address'],
        PhoneNumber: data['PhoneNumber'],
        Email: data['Email'],
        Gender: data['Gender'],
        DateOfBirth: this.datepipe.transform(data['DateOfBirth'], 'yyyy-MM-dd'),
        Specialization: data['Specialization'],
        Experience: data['Experience'],
        JobStatus: data['JobStatus']
      });
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.editForm.value);
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('Doctor');
        this._api.UpdateDoctor(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/doctor');
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
