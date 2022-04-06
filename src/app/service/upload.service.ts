import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  private apiPublicUrl = environment.apiPublicUrl;

  constructor(private http: HttpClient) { }
  upload(file: File,userName: string, jobId): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('username',userName);
    formData.append('jobId',jobId);
    const req = new HttpRequest('POST', `${this.apiPublicUrl}upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

}
