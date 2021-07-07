import {Injectable} from '@angular/core';
import {Imachine} from '../Imodel/Imachine';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Iworkplace} from '../Imodel/Iworkplace';

@Injectable({
  providedIn: 'root',
})
export class FactoriesService {
  private selectedFactoryId: number;
  private workPlaces;

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  private workplaceBaseApi = 'http://104.155.99.161:8080/workplaceApi/v1/';
  private header = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  async getworkPlaces() {
    this.workPlaces = await this.http
      .get(this.workplaceBaseApi + 'getAllWorkplaceByEmployerId/1', {
        headers: this.header,
      })
      .toPromise()
      .catch((err) => {
        console.log(err);
      });

    return this.workPlaces;
  }

  setSelectedFactoryId(id: number) {
    this.selectedFactoryId = id;
  }

  getSelectedFactoryId() {
    return this.selectedFactoryId;
  }
}
