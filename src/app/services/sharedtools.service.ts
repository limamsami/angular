import { Injectable, ViewChild } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class SharedtoolsService {


    constructor(private router: Router) {
    }


    redirectTo(path: string) {
        this.router.navigate([path]);
    }

}