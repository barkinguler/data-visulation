import { ElementRef, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Ifavories } from 'src/app/Imodel/Ifavories';
import { AuthService } from 'src/app/Services/auth.service';
import { ModalService } from 'src/app/Services/modal.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  @ViewChild('modal') elementRef: ElementRef

  graphics: Ifavories[] = [];
  constructor(public authservice: AuthService, private modalService: ModalService) {

  }

  ngAfterViewInit(): void {

    this.modalService.setup(this.elementRef);
  }

  ngOnInit(): void {
    this.modalService.subjectGraphics.subscribe(
      value => {
        this.graphics = value;
      }
    )
  }
  open() {


    this.modalService.open();
  }

  close() {
    this.modalService.close();
  }
  getGraphics() {
    return this.graphics;
  }

  deleteGraphic(graphic: Ifavories) {
    this.modalService.deleteGraphic(graphic);

  }


}
