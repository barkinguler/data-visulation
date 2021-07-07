import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/Services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  userSystemInfo = {
    username: '',
    password: '',
  };

  constructor(private router: Router, private authservice: AuthService) {
  }

  isLogin = false;

  ngOnInit(): void {
  }

  async onSubmit(authForm) {
    await this.authservice.generateToken(this.userSystemInfo);
    if (this.authservice.getToken()) {
      console.log(this.authservice.getToken());
      this.authservice.logIn.next(true);
      this.router.navigate(['/main']);
    } else {
      this.isLogin = true;
    }
  }
}
