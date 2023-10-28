import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
// import { DialogComponent } from '../dialog/dialog.component';

@Injectable({
    providedIn: 'root'
})
export class ConfirmDialogService {
    private subject = new Subject<any>();

    constructor(
        // private confirmationService: ConfirmationService,


    ) { }

    confirmDialog(title: string, message: string, icon: string, type: string, accept: () => void, reject: () => void) {
        this.setConfirmation(title, message, icon, type, accept, reject);
    }

    setConfirmation(title: string, message: string, icon: string, type: string, accept: () => void, reject: () => void) {
        // this.confirmationService.confirm({
        //     message: '',
        //     header: (title) ? title + '<br/>' + message : message,
        //     icon: icon,
        //     accept: () => {
        //         accept();
        //         ///this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        //     },
        //     reject: (eventType: any) => {
        //         switch (eventType) {
        //             case ConfirmEventType.REJECT:
        //                 reject();
        //                 //this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        //                 break;
        //             case ConfirmEventType.CANCEL:
        //                 //accept();
        //                 //this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
        //                 break;
        //         }
        //     }
        // });

        // ==> C'est exactement pour recuperer les infos dans l'html de dialog component
        this.subject.next({
            message: '',
            header: (title) ? title + '<br/>' + message : message,
            icon: icon,
            type: type,
            accept: () => {
                accept();
                //this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            },
            reject: (eventType: any) => {
                switch (eventType) {
                    case ConfirmEventType.REJECT:
                        reject();
                        //this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                        break;
                    case ConfirmEventType.CANCEL:
                        //accept();
                        //this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                        break;
                }
            }
        });
    }

    getModalInfo(): Observable<any> {
        //console.log('this.subject.asObservable()', this.subject.asObservable());
        return this.subject.asObservable();
    }
}
