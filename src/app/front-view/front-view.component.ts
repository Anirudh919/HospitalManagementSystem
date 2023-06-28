import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-front-view',
  templateUrl: './front-view.component.html',
  styleUrls: ['./front-view.component.css']
})
export class FrontViewComponent implements OnInit {
  click = false;

  FeedbackForm = this.Form.group({
    username: [''],
    Email: [''],
    FeedbackMessage: [''],

  })

  constructor(private _api: ServiceService, private Form: FormBuilder, private router: Router) { }

  ngOnInit(): void {

  }

  // onClick() {
  //   console.log("hii")
  //   this.click = true
  // }

  onSubmit() {
    this.click = true;
    console.log(this.FeedbackForm.value);
    if (!this.FeedbackForm.valid) {
      return false;
    } else {
      return this._api.AddFeedback(this.FeedbackForm.value).subscribe({
        complete: () => {
          this.router.navigateByUrl('/frontview');
        },
        error: (e) => {
          console.log(e);
        },
      });

    }
  }

}
