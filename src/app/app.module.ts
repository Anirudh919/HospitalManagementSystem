import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { PatientCreateComponent } from './components/Patients/patient-create/patient-create.component';
import { DoctorDetailComponent } from './components/Doctors/doctor-detail/doctor-detail.component';
import { DoctorEditComponent } from './components/Doctors/doctor-edit/doctor-edit.component';
import { PatientEditComponent } from './components/Patients/patient-edit/patient-edit.component';
import { PatientDetailComponent } from './components/Patients/patient-detail/patient-detail.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentDetailComponent } from './components/Appointment/appointment-detail/appointment-detail.component';
import { AppointmentAddComponent } from './components/Appointment/appointment-add/appointment-add.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PatientCreateComponent,
    DoctorDetailComponent,
    DoctorEditComponent,
    PatientEditComponent,
    PatientDetailComponent,
    AppointmentDetailComponent,
    AppointmentAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUsefulSwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
