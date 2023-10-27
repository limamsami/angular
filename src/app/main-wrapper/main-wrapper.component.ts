import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-main-wrapper',
  templateUrl: './main-wrapper.component.html',
  styleUrls: ['./main-wrapper.component.css']
})
export class MainWrapperComponent {

  constructor(private _service:ApiService){

  }

  // dialogConfig = new MatDialogConfig();
  // modalDialog: MatDialogRef<ModalComponent, any> | undefined;
  openMdl?:boolean;
  openModal() {

      this.openMdl=true;

    
     //this.matDialog.open(CreateCompanyComponent);
  }
  //inisialisation
   companies:any[]=[];
   deleteCompany(id:any){
    this._service.deleteCompany(id).subscribe((data:any)=>{
      console.log(data);
    });
   }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.openMdl=false;
    this._service.getAllCompanies().subscribe((data:any)=>{
      console.log(data);
      this.companies=data;
    });
  }
}
