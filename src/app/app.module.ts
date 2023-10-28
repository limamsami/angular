import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AppComponent }   from './app.component';
import { CalendarModule } from 'primeng/calendar';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputTextModule} from 'primeng/inputtext';
import {MultiSelectModule} from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MainWrapperComponent } from './main-wrapper/main-wrapper.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { CreateCompanyComponent } from './create-company/create-company.component';
import { PopupModelComponent } from './utils/popup-model/popup-model.component';
import { LoginComponent } from './login/login.component';
import { CompnaiesComponent } from './compnaies/compnaies.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfirmDialogService } from './services/confirm-dialog.service';
import { SharedtoolsService } from './services/sharedtools.service';
import { ApiService } from './services/api.service';


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
    RouterModule,
    AppRoutingModule,
    
  ],
  declarations: [ AppComponent, SideBarComponent, MainWrapperComponent, MainHeaderComponent, CreateCompanyComponent, PopupModelComponent, LoginComponent, CompnaiesComponent ],
  bootstrap: [ AppComponent ],
  providers: [ConfirmDialogService]
})

export class AppModule { }