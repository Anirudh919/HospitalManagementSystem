import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { PatientDetailComponent } from './components/Patients/patient-detail/patient-detail.component';
import { DoctorDetailComponent } from './components/Doctors/doctor-detail/doctor-detail.component';
import { AppointmentDetailComponent } from './components/Appointment/appointment-detail/appointment-detail.component';
import { AppointmentAddComponent } from './components/Appointment/appointment-add/appointment-add.component';
import { DoctorEditComponent } from './components/Doctors/doctor-edit/doctor-edit.component';
import { PatientEditComponent } from './components/Patients/patient-edit/patient-edit.component';
import { FrontViewComponent } from './front-view/front-view.component';


const routes: Routes = [
  // {
  //   path: '', component: HomeComponent, canActivate: [AuthGuardService], children: [
  //     { path: 'frontview', component: FrontViewComponent },
  //     { path: 'patient', component: PatientDetailComponent },
  //     { path: 'patient/edit/:id', component: PatientEditComponent },
  //     { path: 'doctor', component: DoctorDetailComponent },
  //     { path: 'doctor/edit/:id', component: DoctorEditComponent },
  //     { path: 'appointment', component: AppointmentDetailComponent },
  //     { path: 'addappointment', component: AppointmentAddComponent },
  //   ]
  // },
  {
    path: '', component: HomeComponent, canActivate: [AuthGuardService], children:
      [
        { path: 'patient', component: PatientDetailComponent },
        { path: 'patient/edit/:id', component: PatientEditComponent },
        { path: 'doctor', component: DoctorDetailComponent },
        { path: 'doctor/edit/:id', component: DoctorEditComponent },
        { path: 'appointment', component: AppointmentDetailComponent },
        { path: 'addappointment', component: AppointmentAddComponent },],

  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
]

// { path: 'login', component: LoginComponent },
// { path: 'register', component: RegisterComponent }



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
