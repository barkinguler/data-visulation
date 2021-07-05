import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { ILogs } from '../Imodel/Ilogs';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private equipmentLogApiBaseUrl = 'http://104.155.99.161:8080/equipmentLogApi/v1/';

  private logs = new Subject<ILogs[]>();
  private equipmentBaseUrl = 'http://104.155.99.161:8080/equipmentApi/v1/';
  private header = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + this.authService.getToken(),
  });

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private messageService: MessageService
  ) {
  }


  findEquipment(id: number): Observable<any> {
    document.body.style.cursor = 'wait';
    return this.http
      .get(this.equipmentLogApiBaseUrl + 'getLogByWorkerId/' + id, {
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
          console.log(postArray);
          document.body.style.cursor = 'default';
          return postArray;
        })
      );
  }


  getStoredLogs(): Observable<ILogs[]> {
    return this.logs;
  }

  getAllEquipmentByMachineId(id: number): Observable<any> {
    return this.http
      .get(this.equipmentBaseUrl + 'getAllEquipmentByMachineId/' + id, {
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
          console.log(postArray);

          return postArray;
        })
      );
  }

  registerEquipment(workerId: number, equipmentId: number): Observable<any> {
    console.log(workerId, equipmentId);
    return this.http.put(
      this.equipmentBaseUrl +
      'updateWorkerIdByEquipmentId/' +
      equipmentId +
      '/' +
      workerId,
      null,
      { headers: this.header }
    );
  }
}
