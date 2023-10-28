import { Component } from '@angular/core';
import { User } from '../models/company-contact/user';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

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
    try {
        const response = await this.app.apiService.login(_login, _mdp);
        console.log("login ==> ", response);

        const userLogged: any = response;

        if (userLogged.Result) {
            // let msg = this.translate.instant('racine.errorsApi.errorsMsgApi_'+ userLogged.Result); //+ userLogged.Result
            this.app.confirm.confirmDialog('',  userLogged.Result, 'KO', "alert", () => {
              this.router.navigate(['login']);
            }, () => { })

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
