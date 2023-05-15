import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent implements OnInit{

  editForm!:FormGroup;
  submitted=false;

  constructor(public Form:FormBuilder,private actRoute:ActivatedRoute,private _api:ServiceService,private router:Router){

  }

  ngOnInit(): void {

this.editForm=this.Form.group({
DoctorName:[''],
Address:[''],
PhoneNumber:[''],
Email:[''],
Gender:[''],
DateofBirth:[''],
Specialization:[''],
Experience:['']
})
}

onSubmit(){
  this.submitted = true;

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
