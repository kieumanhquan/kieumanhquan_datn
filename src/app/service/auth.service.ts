import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {User} from '../models/model/User';



@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public addUser(user: User): Observable<any> {
    return this.http.post(`${this.apiServerUrl}`+'auth/register',user).pipe(
      tap(users => console.log(`users=${JSON.stringify(users)}`)),
    );
  }

  public sendOtp(user: User): Observable<any> {
    return this.http.post(`${this.apiServerUrl}`+'auth/reset-password/init',user).pipe(
      tap(users => console.log(`users=${JSON.stringify(users)}`)),
    );
  }
  public changePassword(user: User,email: string): Observable<any> {
    return this.http.post(`${this.apiServerUrl}`+'auth/reset-password/finish?email='+email,user).pipe(
      tap(users => console.log(`users=${JSON.stringify(users)}`)),
    );
  }
}
