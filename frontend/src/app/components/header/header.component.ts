import { ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ModalService } from 'src/app/Services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  favories = [];

  constructor(public authservice: AuthService, private router: Router, private modalService: ModalService) {

  }
  ngOnInit(): void {


  }

  exit() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.router.navigate(['auth']);
    this.modalService.graphics = []
    this.modalService.subjectGraphics.next(this.modalService.graphics);
  }
  
  getFavories() {
    console.log(this.favories);
    return this.favories;
  }

}
