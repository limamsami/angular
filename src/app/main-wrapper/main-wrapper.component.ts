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
  //inisialisation
   companies:any[]=[];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._service.getAllCompanies().subscribe((data:any)=>{
      console.log(data);
      this.companies=data;
    });
  }
}
