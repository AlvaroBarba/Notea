import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  //Activar tema oscuro

  enableDark() {
    this.renderer.removeClass(this.document.body, 'light-theme');
    this.renderer.addClass(this.document.body, 'dark-theme');
  }

  //Activar tema claro

  enableLight() {
    this.renderer.removeClass(this.document.body, 'dark-theme');
    this.renderer.addClass(this.document.body, 'light-theme');
  }

  //Activar tema por defecto

  enableDefault() {
    this.renderer.removeClass(this.document.body, 'dark-theme');
    this.renderer.removeClass(this.document.body, 'light-theme');
  }
}