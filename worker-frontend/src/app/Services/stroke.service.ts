import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StrokeService {
  geturl = 'http://104.155.99.161:8080/workerApi/v1/getStrokeStatusById/';

  constructor(private http: HttpClient) {
  }

  private header = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  getPredict(id: number) {
    return this.http.get(this.geturl + id, {headers: this.header});
  }
}
