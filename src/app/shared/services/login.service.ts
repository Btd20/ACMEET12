import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { login } from '../interfaces/login';
import { changePasswordUser } from '../interfaces/changePasswordUser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private myAppUrl: string = environment.endpoint.users;
  private myApiUrl: string =  'api/Auth/Login';
  private changePasswordURL: string = 'api/Auth/ChangePassword';

  constructor(private http: HttpClient) {}

  userLogin(user : login) : Observable<any>{
    return this.http.post<any>(this.myAppUrl + this.myApiUrl,user);
  }

  changePassword(contraseña: changePasswordUser): Observable<changePasswordUser>{
    return this.http.post<changePasswordUser>(this.myAppUrl + this.changePasswordURL, contraseña);
  }
}
