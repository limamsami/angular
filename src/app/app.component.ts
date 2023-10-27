import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { SelectItem, FilterService, FilterMatchMode } from "primeng/api";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {

  
  
  

  constructor(
    public router: Router
  ) {}

  ngOnInit() {
  }
 

  
}
