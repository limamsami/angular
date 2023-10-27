import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from '../services/api.service';
import { CompanyContact } from '../models/company-contact/company-contact';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {
  constructor(private _service:ApiService) { }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }
  modals=false;
  company=new CompanyContact();
  createCompany(){
    this._service.createCompany(this.company).subscribe((data:any)=>{
      console.log(data);
      window.location.reload();
    });
  }

}
