import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/model/User';

@Injectable({
  providedIn: 'root',
})

export class UserService{

  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getDecodedAccessToken(): any {
    const token = sessionStorage.getItem('auth-token');
    try {
      console.log(jwt_decode(token));
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  public getUserByUserName(userName: string): Observable<User> {
    return this.http.get<any>(`${this.apiServerUrl}`+'public/user/username='+userName).pipe(
      tap(user => console.log(`user=${JSON.stringify(user)}`)),
    );
  }
}
