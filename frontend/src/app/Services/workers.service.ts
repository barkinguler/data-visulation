import {Injectable} from '@angular/core';
import {Iworker} from '../Imodel/Iworker';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  constructor(private http: HttpClient, private authService: AuthService, private messageService: MessageService) {
  }

  private workers;
  private workerApiBaseUrl = 'http://104.155.99.161:8080/workerApi/v1/';
  private workerStatusApiBaseUrl = 'http://104.155.99.161:8080/workerStatus/v1/';
  private header = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token')
  });

  async createWorker(workerInfo) {
    document.body.style.cursor = 'wait';
    console.log(workerInfo);
    await this.http.post(this.workerApiBaseUrl + 'createWorker', workerInfo, {headers: this.header})
      .toPromise().catch(header => {
        this.messageService.catchHeader(header);
        return header;
      });
    document.body.style.cursor = 'default';
  }

  async getWorkersforFactory(value: number) {
    document.body.style.cursor = 'wait';
    this.workers = await this.http.get(this.workerApiBaseUrl + 'getAllUserByWorkplaceId/' + value, {headers: this.header})
      .toPromise().catch(header => {
        this.messageService.catchHeader(header);
      });
    document.body.style.cursor = 'default';
    return this.workers;
  }

  async updateWorkerById(id, workerInfo) {
    document.body.style.cursor = 'wait';
    let response = await this.http.put(this.workerApiBaseUrl + 'updateWorkerById/'
      + id, workerInfo, {headers: this.header}).toPromise().catch(header => {
      this.messageService.catchHeader(header);
    });
    document.body.style.cursor = 'default';
    return response;

  }

  async deleteWorkerById(id) {
    document.body.style.cursor = 'wait';
    let response = await this.http.delete(this.workerApiBaseUrl + 'deleteWorkerById/' + id, {headers: this.header})
      .toPromise().catch(header => {
        this.messageService.catchHeader(header);
      });
    document.body.style.cursor = 'none';
    return response;
  }

  findWorker(id: number): Iworker {
    for (const worker of this.workers) {
      if (worker.id === id) {
        return worker;
      }
    }

  }

  findWorkStatus(id: number): Observable<any> {
    return this.http
      .get(
        this.workerStatusApiBaseUrl + 'getWorkerStatusByWorkerId/' + id, { headers: this.header }
      ).pipe(
        tap(responseData => {
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
