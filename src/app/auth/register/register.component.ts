import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
isLogin:boolean=false;

constructor(private _api:ServiceService,private _auth:AuthService,private _router:Router){}

ngOnInit(): void {
  this.isUserLogin();
}

  onSubmit(f: NgForm) {
    this._api.Register('/register', f.value).subscribe((res: any) => {
      if (res.status) {
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this._auth.setDataInLocalStorage('token', res.token);
        this._router.navigate(['login']);
      } else {
        console.log(res);
        alert(res.data);
      }
    });
  }

  isUserLogin() {
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }
}
