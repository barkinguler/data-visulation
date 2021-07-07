import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MachinePredictService {
  getUrl = 'http://104.155.99.161:8080/machineApi/v1/getMachineAiPredictById/';

  constructor(private http: HttpClient) {}

  private header = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  getPredict(id: number) {
    return this.http.get(this.getUrl + id, { headers: this.header });
  }
}
