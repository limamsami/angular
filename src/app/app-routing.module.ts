import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateSocieteComponent } from './create-societe/create-societe.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'create-societe', component: CreateSocieteComponent }
];

export default routes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
