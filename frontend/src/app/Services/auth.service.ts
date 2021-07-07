import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IuserSystemInfo} from '../Imodel/IuserSystemInfo';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logIn = new BehaviorSubject<boolean>(false);
  private serviceUrl = 'http://104.155.99.161:8080/login';
  private userSystemInfo: IuserSystemInfo | any;

  constructor(private http: HttpClient) {
  }

  async generateToken(userSystemInfo) {
    document.body.style.cursor = 'wait';
    this.userSystemInfo = await this.http
      .post(this.serviceUrl, userSystemInfo, {responseType: 'text'})
      .toPromise()
      .catch((header) => {
        console.log(header);
      });
    this.userSystemInfo = JSON.parse(this.userSystemInfo);
    if (this.userSystemInfo.token) {
      localStorage.setItem('token', this.userSystemInfo.token);
      localStorage.setItem('userRole', this.userSystemInfo.user_role);
    } else {
      localStorage.removeItem('token');
    }
    document.body.style.cursor = 'default';
  }

  getToken = () => {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  };

  getIsLogin = () => {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  };

  getUserRole = () => {
    return localStorage.getItem('userRole');
  };
}
