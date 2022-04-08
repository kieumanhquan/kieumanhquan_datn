import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobRegisterService {

  private apiPublicUrl = environment.apiPublicUrl;

  constructor(private http: HttpClient) { }

  public findJobRegister(searchJobRegister,page,size): Observable<any> {
    return this.http.post<any>(`${this.apiPublicUrl}`+'job-registers/searches?'+'&page='+page+'&size='+size
      ,searchJobRegister).pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }
  public getStatusRegisterJob(): Observable<any[]> {
    return this.http.get<any>(`${this.apiPublicUrl}`+'status-register-jobs').pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }
  public sortByName(searchJobRegister,page,size): Observable<any> {
    // eslint-disable-next-line max-len
    return this.http.post<any>(`${this.apiPublicUrl}`+'job-registers/searches/sortByName?'+'&page='+page+'&size='+size
      ,searchJobRegister).pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }

  public getJobRegisterById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiPublicUrl}`+'job-registers/id='+id).pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }



  public getByJobId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiPublicUrl}`+'job-registers/jobId='+id).pipe(
      tap(receivedJob => console.log(`profile=${JSON.stringify(receivedJob)}`)),
    );
  }

  public updateStatusJob(statusDto): Observable<any> {
    return this.http.put(`${this.apiPublicUrl}`+'job-registers/status_job',statusDto).pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }

  public schedule(schedule): Observable<any> {
    return this.http.put(`${this.apiPublicUrl}`+'job-registers/schedule',schedule).pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }
  public downloadCv(id: number): Observable<Blob>{
    const url = `${this.apiPublicUrl}` + 'job-registers/download/' + id;
    return this.http.get(url, {responseType: 'blob'});
  }

}
