import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent }   from './app.component';
import { CalendarModule } from 'primeng/calendar';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputTextModule} from 'primeng/inputtext';
import {MultiSelectModule} from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { CreateSocieteComponent } from './create-societe/create-societe.component';
import { RouterModule } from '@angular/router';
import routes from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
		AutoCompleteModule,
		FormsModule,
		TableModule,
		InputTextModule,
		CalendarModule,
    HttpClientModule,
    MultiSelectModule,
    TooltipModule,
    RouterModule.forRoot(routes),
    NgxSmartModalModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [ AppComponent, CreateSocieteComponent, HomeComponent,LoginComponent, SignupComponent],
  bootstrap: [ AppComponent ],
  providers: []
})

export class AppModule { }