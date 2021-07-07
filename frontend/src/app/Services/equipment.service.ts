import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MessageService} from './message.service';
import {ILogs} from '../Imodel/Ilogs';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private messageService: MessageService
  ) {
  }

  private logs = new Subject<ILogs[]>();
  private equipments;
  private equipmentLogApiBaseUrl =
    'http://104.155.99.161:8080/equipmentLogApi/v1/';
  private equipmentBaseUrl = 'http://104.155.99.161:8080/equipmentApi/v1/';
  private header = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  async createEquipment(equipmentInfo) {
    document.body.style.cursor = 'wait';
    return await this.http
      .post(this.equipmentBaseUrl + 'createEquipment', equipmentInfo, {
        headers: this.header,
      })
      .toPromise()
      .catch((header) => {
        document.body.style.cursor = 'default';
        this.messageService.catchHeader(header);
      });
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
              postArray.push({...responseData[key]});
            }
          }
          this.logs.next(postArray);
          console.log(postArray);
          document.body.style.cursor = 'default';
          return postArray;
        })
      );
  }

  async findEquipmentByWorkplaceId(workplaceId) {
    document.body.style.cursor = 'wait';
    this.equipments = this.http
      .get(
        this.equipmentBaseUrl + 'getAllEquipmentByWorkplaceId/' + workplaceId,
        {headers: this.header}
      )
      .toPromise()
      .catch((header) => {
        this.messageService.catchHeader(header);
      });
    document.body.style.cursor = 'default';
    return this.equipments;
  }

  async updateEquipmentById(equipmentId, equipmentInfo) {
    document.body.style.cursor = 'wait';
    let response = this.http
      .put(
        this.equipmentBaseUrl + 'updateEquipmentById/' + equipmentId,
        equipmentInfo,
        {headers: this.header}
      )
      .toPromise()
      .catch((header) => {
        this.messageService.catchHeader(header);
      });
    document.body.style.cursor = 'default';
    return response;
  }

  async deleteEquipmnetById(equipmentId) {
    document.body.style.cursor = 'wait';
    let response = this.http
      .delete(this.equipmentBaseUrl + 'deleteEquipmentById/' + equipmentId, {
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
