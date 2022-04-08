import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/model/User';
import {Profiles} from '../models/model/Profiles';

@Injectable({
  providedIn: 'root',
})

export class UserService{

  private apiServerUrl = environment.apiPublicUrl;

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
    return this.http.get<any>(`${this.apiServerUrl}`+'user/username='+userName).pipe(
      tap(user => console.log(`user=${JSON.stringify(user)}`)),
    );
  }
  public getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}`+'user/id='+id).pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }

  public getJe(): Observable<any[]> {
    return this.http.get<any>(`${this.apiServerUrl}`+'user/role=ROLE_JE').pipe(
      tap(jobPositions => console.log(`academicLevels=${JSON.stringify(jobPositions)}`)),
    );

  }
  public updateUser(user: User): Observable<any> {
    return this.http.post(`${this.apiServerUrl}`+'user',user).pipe(
      tap(updateUser => console.log(`receivedJob=${JSON.stringify(updateUser)}`)),
    );
  }

  public searchUser(searchUserRegister,page,size): Observable<any> {
    // eslint-disable-next-line max-len
    return this.http.post<any>(`${this.apiServerUrl}`+'user/searches?'+'page='+page+'&size='+size
      ,searchUserRegister).pipe(
      tap(receivedUser => console.log(`receivedJob=${JSON.stringify(receivedUser)}`)),
    );

  }  public updateUserProfile(profiles: Profiles): Observable<any> {
    return this.http.post(`${this.apiServerUrl}`+'user/profiles',profiles).pipe(
      tap(updateUser => console.log(`receivedJob=${JSON.stringify(updateUser)}`)),
    );
  }


  getUserProfilesByUserName(userName: string): Observable<Profiles>  {
    return this.http.get<any>(`${this.apiServerUrl}`+'user/profiles/userName='+userName).pipe(
      tap(user => console.log(`user=${JSON.stringify(user)}`)),
    );
  }

  getAllAcademicLevel() {
    return this.http.get<any>(`${this.apiServerUrl}`+'user/profiles/academicLevels').pipe(
      tap(user => console.log(`academicLevels=${JSON.stringify(user)}`)),
    );
  }
}
