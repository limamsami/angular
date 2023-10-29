import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateSocieteComponent } from './create-societe/create-societe.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth-guard.service';

const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent ,canActivate:[AuthGuard]},
  { path: 'create-societe', component: CreateSocieteComponent }
];

export default routes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
