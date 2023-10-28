import { NgModule } from '@angular/core';
import { NavigationError, Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CompnaiesComponent } from './compnaies/compnaies.component';

const routes: Routes = [
  { path: '', component: CompnaiesComponent },

  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
