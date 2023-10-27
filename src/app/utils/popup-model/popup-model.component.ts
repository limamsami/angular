import { Component } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-popup-model',
  templateUrl: './popup-model.component.html',
  styleUrls: ['./popup-model.component.css']
})
export class PopupModelComponent {

  bsModalRef?: BsModalRef;
  constructor(private modalService: BsModalService) {}
 
  public openModalWithComponent(component:any) {
    const initialState: ModalOptions = {
      initialState: {
        
        title: 'Modal with component'
      }
    };
    this.bsModalRef = this.modalService.show(component, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
