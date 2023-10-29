import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { User } from '../company-contact/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  user=new User();
 /**
  *
  */
 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  sessionStorage.setItem('userData', JSON.stringify(null));

 }
 constructor(public app: AppComponent) {
  
 }
  async signup(user: any) {
    console.log("user sginup  ==> ", user);

    try {
      await this.app.apiService.signup(user);
        const response = await this.app.apiService.login(user.username,user.password);
        console.log("login ==> ", response.Result);

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
navigateToLogin(){
  let urlToRedirect = 'login' ;
  this.app.router.navigate([urlToRedirect]);
}
}
