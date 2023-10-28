import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "./services/api.service";
import { ConfirmDialogService } from "./services/confirm-dialog.service";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {

  
  
  

  constructor(public router: Router,
    public route: ActivatedRoute,
    public apiService: ApiService,
    public confirm:ConfirmDialogService
  ) {}

  ngOnInit() {
  }
 

  
}
