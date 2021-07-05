import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ILogs } from '../Imodel/Ilogs';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  private workerStatusApiBaseUrl = 'http://104.155.99.161:8080/machineLogsApi/v1/';

  private logs = new Subject<ILogs[]>();
  private machineApiBaseUrl = 'http://104.155.99.161:8080/machineApi/v1/';
  private header = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + this.authService.getToken(),
  });

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private messageService: MessageService
  ) {
  }

  findMachinesbyWorkerId(id: number): Observable<any> {
    document.body.style.cursor = 'wait';
    return this.http
      .get(this.workerStatusApiBaseUrl + 'getMachineIdByWorkerId/' + id, {
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
          this.logs.next(postArray);

          document.body.style.cursor = 'default';
          return postArray;
        })
      );
  }


  getStoredLogs(): Observable<ILogs[]> {
    return this.logs;
  }

  getMachineItems(id: number): Observable<any> {
    return this.http
      .get(this.machineApiBaseUrl + 'getAllMachineByWorkerId/' + id, {
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

          return postArray;
        })
      );
  }

  registerMachine(workerId: number, machineId: number): Observable<any> {
    return this.http.put(
      this.machineApiBaseUrl +
      'updateWorkerIdByMachineId/' +
      machineId +
      '/' +
      workerId,
      null,
      { headers: this.header }
    );
  }

  unregisterMachine(workerId: number): Observable<any> {
    return this.http.delete(
      this.machineApiBaseUrl +
      'deleteWorkerIdByMachineId/' +
      workerId,
      { headers: this.header }
    );
  }

}
