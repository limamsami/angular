import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Car } from './car';

@Injectable()
export class CarService {
    constructor(private http: HttpClient) { }

    getCarsMedium() {
        return this.http.get<any>('assets/cars-medium.json')
        .toPromise()
        .then(res => <Car[]>res.data)
        .then(data => { return data; });
    }
}