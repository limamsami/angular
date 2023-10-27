import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviorment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCompanyById(id:any): Observable<any> {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
    });
    let options = { headers: headers };
    return this.http.get<any>(environment.companyContactsCtrl.getById+'/'+id, options);
  }
  getAllCompanies(): Observable<any> {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
    });
    let options = { headers: headers };
    return this.http.get<any>(environment.companyContactsCtrl.getAll, options);
  }
  createCompany(company:any): Observable<any> {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
    });
    let options = { headers: headers };
    return this.http.post<any>(environment.companyContactsCtrl.create,company, options);
  }
  updateCompany(id:any): Observable<any> {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
    });
    let options = { headers: headers };
    return this.http.delete<any>(environment.companyContactsCtrl.update+'/'+id, options);
  }
}
