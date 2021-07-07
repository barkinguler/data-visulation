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
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  private logs = new Subject<ILogs[]>();
  private machines;
  private workerStatusApiBaseUrl =
    'http://104.155.99.161:8080/machineLogsApi/v1/';
  private machineApiBaseUrl = 'http://104.155.99.161:8080/machineApi/v1/';

  private header = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

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

  async createMachine(machineInfo) {
    document.body.style.cursor = 'wait';
    return await this.http
      .post(this.machineApiBaseUrl + 'createMachine', machineInfo, {
        headers: this.header,
      })
      .toPromise()
      .catch((header) => {
        document.body.style.cursor = 'default';
        this.messageService.catchHeader(header);
      });
  }

  async findeMachineByWorkplaceId(workplaceId) {
    document.body.style.cursor = 'wait';
    this.machines = await this.http
      .get(
        this.machineApiBaseUrl + 'getAllMachineByWorkplaceId/' + workplaceId,
        { headers: this.header }
      )
      .toPromise()
      .catch((header) => {
        this.messageService.catchHeader(header);
      });
    document.body.style.cursor = 'default';
    return this.machines;
  }

  async updateMachineById(machineId, machineInfo) {
    document.body.style.cursor = 'wait';
    let response = await this.http
      .put(
        this.machineApiBaseUrl + 'updateMachineById/' + machineId,
        machineInfo,
        { headers: this.header }
      )
      .toPromise()
      .catch((header) => {
        this.messageService.catchHeader(header);
      });
    document.body.style.cursor = 'default';
    return response;
  }

  async deleteMachineById(machineId) {
    document.body.style.cursor = 'wait';
    let response = await this.http
      .delete(this.machineApiBaseUrl + 'deleteMachineById/' + machineId, {
        headers: this.header,
      })
      .toPromise()
      .catch((header) => {
        this.messageService.catchHeader(header);
      });
    document.body.style.cursor = 'default';
    return response;
  }

  getStoredLogs(): Observable<ILogs[]> {
    return this.logs;
  }
}
