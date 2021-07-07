import { Injectable } from '@angular/core';
import { Iworker } from '../Imodel/Iworker';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class WorkersService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  private workers;
  private workerApiBaseUrl = 'http://104.155.99.161:8080/workerApi/v1/';
  private workerStatusApiBaseUrl =
    'http://104.155.99.161:8080/workerStatus/v1/';
  private header = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + this.authService.getToken(),
  });

  findWorkStatus(id: number): Observable<any> {
    return this.http
      .get(this.workerStatusApiBaseUrl + 'getWorkerStatusByWorkerId/' + id, {
        headers: this.header,
      })
      .pipe(
        tap((responseData) => {
          const postArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key] });
            }
          }
          console.log(postArray);
          return postArray;
        })
      );
  }
}
