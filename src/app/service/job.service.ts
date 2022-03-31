import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Job } from '../models/model/Job';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {JobDto} from '../models/model/JobDto';

@Injectable({
  providedIn: 'root',
})
export class JobService {

  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getJob(): Observable<Job[]> {
    return this.http.get<any>(`${this.apiServerUrl}`+'jobs').pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }

  public addJob(job: JobDto): Observable<any> {
    return this.http.post(`${this.apiServerUrl}`+'jobs',job).pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }

  public getStatusJob(): Observable<any[]> {
    return this.http.get<any>(`${this.apiServerUrl}`+'statusJobs').pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }

  public getJobById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}`+'jobs/id='+id).pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }

  public findJob(name, statusJob, salaryMin, salaryMax,page,size): Observable<any> {
    // eslint-disable-next-line max-len
    return this.http.get<any>(`${this.apiServerUrl}`+'jobs/searchesT?'+'name='+name+'&statusJob='+statusJob+'&salaryMin='+salaryMin+'&salaryMax='+salaryMax+'&page='+page+'&size='+size).pipe(
      tap(receivedJob => console.log(`receivedJob=${JSON.stringify(receivedJob)}`)),
    );
  }
}
