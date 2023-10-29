import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../enviroments/enviorment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAutentication() {
    const user: any = JSON.parse(sessionStorage.getItem('userData')!);
    const token: any = (user) ? user.token : null;
    console.log('token: ',token)
    console.log('user: ',user)
    return token;
}

  getCompanyById(id:any): Observable<any> {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getAutentication()
    });
    let options = { headers: headers };
    return this.http.get<any>(environment.companyContactsCtrl.getById+'/'+id, options);
  }
  getAllCompanies(): Observable<any> {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAutentication()}`
    });
    console.log(headers)
    let options = { headers: headers };
    return this.http.get<any>(environment.companyContactsCtrl.getAll, options);
  }
  createCompany(company:any): Observable<any> {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getAutentication()
    });
    console.log(company);
    let options = { headers: headers };
    return this.http.post<any>(environment.companyContactsCtrl.create,company, options);
  }
  updateCompany(company:any): Observable<any> {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getAutentication()
    });
    let options = { headers: headers };
    return this.http.put<any>(environment.companyContactsCtrl.update,company, options);
  }
  deleteCompany(id:any): Observable<any> {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getAutentication()
    });
    let options = { headers: headers };
    return this.http.delete<any>(environment.companyContactsCtrl.delete+'/'+id, options);
  }
  deleteAllCompany(companielist:any): Observable<any> {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getAutentication()
    });
    let options = { headers: headers };
    return this.http.post<any>(environment.companyContactsCtrl.deleteAll,companielist, options);
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
