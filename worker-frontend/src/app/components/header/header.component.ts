import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authservice: AuthService, private router: Router) {

  }

  ngOnInit(): void {
  }
  exit(){
    localStorage.removeItem('token');
    this.router.navigate(['auth']);
  }

}
