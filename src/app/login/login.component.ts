import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { User } from '../company-contact/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user=new User();
 /**
  *
  */
 constructor(private router: Router,public app: AppComponent) {
  
 }
  async setConnexion(_login: any, _mdp: any) {
    console.log("_login, _mdp ==> ", _login, _mdp);

    try {
        const response = await this.app.apiService.login(_login, _mdp);
        console.log("login ==> ", response);

        const userLogged: any = response;

        if (userLogged.Result) {

            return;
        }
        sessionStorage.setItem('userData', JSON.stringify(response));
        console.log("userLogged", userLogged);
        let urlToRedirect = '/' ;
        console.log("urlToRedirect", urlToRedirect);

        this.app.router.navigate([urlToRedirect]);
    }
    catch (error) {
        console.error(error);
    }
}



}
