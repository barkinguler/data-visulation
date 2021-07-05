import { Renderer2 } from '@angular/core';
import { RendererFactory2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ifavories } from '../Imodel/Ifavories';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalRef: ElementRef;

  graphics = [];
  subjectGraphics = new Subject<Ifavories[]>();
  private renderer: Renderer2;
  constructor(public rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }


  setup(value: ElementRef) {
    this.modalRef = value;

  }
  open() {

    this.renderer.addClass(this.modalRef.nativeElement, 'backdrop');
    this.renderer.addClass(this.modalRef.nativeElement, 'show');
  }
  close() {
    this.renderer.removeClass(this.modalRef.nativeElement, 'show');

  }

  saveGraphic(value: Ifavories) {

    this.graphics.push(value);
    this.subjectGraphics.next(this.graphics);

  }

  deleteGraphic(graphic: Ifavories) {
    this.graphics = this.graphics.filter(item => item != graphic);
    this.subjectGraphics.next(this.graphics);
  }

}
