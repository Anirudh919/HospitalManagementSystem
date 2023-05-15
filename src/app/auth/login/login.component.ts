import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
isLogin:boolean=false;
  Data:any;
  constructor( private _api:ServiceService,private _auth:AuthService,private _router:Router){}

  ngOnInit(): void {
    this.isUserLogin();
  }
  onSubmit(f: NgForm) {
    console.log('Your form data :', f.value);
    this._api.Login('/login', f.value).subscribe((res: any) => {
      if (res.status) {
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this._auth.setDataInLocalStorage('token', res.token);
        this._router.navigate(['']);
      } else if(res.data){
        this.Data=res.data;
        if(res.data==res.data[0])
{
  console.log("hiii")
}else if(res.data=="Incorrect_password")     {
  this.Data=res.data;
}else if(res.data=="Not_register")     {
  this.Data=res.data;
}
   console.log(this.Data);
      }else {
        this._router.navigate(['register']);
      }
    });
  }

  isUserLogin(){
    if(this._auth.getUserDetails() != null){
      this.isLogin=true;
    }
  }
}
