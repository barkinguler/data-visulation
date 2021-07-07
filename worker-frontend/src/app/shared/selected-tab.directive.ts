import {HostListener} from '@angular/core';
import {RendererFactory2} from '@angular/core';
import {Directive, Renderer2} from '@angular/core';

@Directive({
  selector: '[appSelectedTab]',
})
export class SelectedTabDirective {
  static tmpItem: any = null;
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent) {
    let parent = (<HTMLElement>event.target).parentElement.parentElement;
    for (let i = 0; i < parent.children.length; i++) {
      this.renderer.removeClass(parent.children[i], 'active');
    }
    parent = (<HTMLElement>event.target).parentElement;
    this.renderer.addClass(parent, 'active');
  }
}
