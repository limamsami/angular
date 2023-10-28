import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/enviroments/enviorment';
import { SharedtoolsService } from './sharedtools.service';
import { ConfirmDialogService } from './confirm-dialog.service';

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
    console.log(company);
    let options = { headers: headers };
    return this.http.post<any>(environment.companyContactsCtrl.create,company, options);
  }
  updateCompany(id:any): Observable<any> {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
    });
    let options = { headers: headers };
    return this.http.put<any>(environment.companyContactsCtrl.update+'/'+id, options);
  }
  deleteCompany(id:any): Observable<any> {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
    });
    let options = { headers: headers };
    return this.http.delete<any>(environment.companyContactsCtrl.delete+'/'+id, options);
  }

  async login(email: string, password: string): Promise<any> {
    const body = { Username: email, Password: password };
    try {
        const response = await firstValueFrom(this.http.post(environment.usersCtrl.login, body));
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
}
