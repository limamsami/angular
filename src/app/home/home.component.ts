import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AppComponent } from '../app.component';
import { CompanyContact } from '../company-contact/company-contact';
import { Mode } from '../common/enums/modification-mode';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  myGroup!: FormGroup;

  constructor(private _app:AppComponent,
    public router: Router,
    public ngxSmartModalService: NgxSmartModalService,
    private fb: FormBuilder
  ) {
    //this.createForm();
  }

  


  ngOnInit(): void {

    this.myGroup = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      address: new FormControl('', Validators.required),
  });
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._app.apiService.getAllCompanies().subscribe((data:any)=>{
      console.log(data);
      this.companies=data;
    });
  }
  
   company=new CompanyContact();

   getCompanyById(id:any){
    console.log("getById==>",id);

    this._app.apiService.getCompanyById(id).subscribe((data:any)=>{
      console.log(data);
      this.company=data;
      this.modes=Mode.update;
      this.ngxSmartModalService.getModal('myModal').open()
    });
   }
   modes =Mode.create
   modificationMode(mode :Mode=this.modes,company:any=null){
    if (mode===Mode.create) {
      this.createCompany()
    }
    if (mode===Mode.update) {
      this.updateCompany(this.company)
    }
    if (mode===Mode.delete) {
    }
    this.modes =Mode.create

   }


   updateCompany(company:any){
    console.log("update==>",company);

    this._app.apiService.updateCompany(company).subscribe((data:any)=>{
      console.log("data==>",data);
      this.ngxSmartModalService.getModal('myModal').close();
      window.location.reload();
    });
   }
   createCompany(){
     this._app.apiService.createCompany(this.company).subscribe((data:any)=>{
      console.log("create==>",data);
       window.location.reload();
     });
   }
   companies:any[]=[];
   deleteCompany(id:any){
    this._app.apiService.deleteCompany(id).subscribe((data:any)=>{
      console.log(data);
      window.location.reload();
    });
   }
   deleteAllCompany(){
    console.log(this.companies);
    this._app.apiService.deleteAllCompany(this.companies).subscribe((data:any)=>{
      console.log(data);
      window.location.reload();
    });
   }
}


