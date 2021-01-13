import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Storage } from '@ionic/storage';

const THEME = "ThemeSelected";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  renderer: Renderer2;
  select:string;

  constructor(private rendererFactory: RendererFactory2,
     @Inject(DOCUMENT) private document: Document,
     private storage : Storage) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  //Guardar tema
  selectedTheme(){
    this.storage.get(THEME).then(val=>{
      if(val){
        this.select = val;
        this.renderer.addClass(this.document.body, this.select);
      }else{
      this.renderer.removeClass(this.document.body, 'light-theme');
      this.renderer.removeClass(this.document.body, 'dark-theme');
      }
    })
    
  }


  //Activar tema oscuro

  enableDark() {
    this.renderer.removeClass(this.document.body, 'light-theme');
    this.renderer.addClass(this.document.body, 'dark-theme');
    this.storage.set(THEME, "dark-theme");
  }

  //Activar tema claro

  enableLight() {
    this.renderer.removeClass(this.document.body, 'dark-theme');
    this.renderer.addClass(this.document.body, 'light-theme');
    this.storage.set(THEME, "light-theme");
  }

  //Activar tema por defecto

  enableDefault() {
    this.renderer.removeClass(this.document.body, 'dark-theme');
    this.renderer.removeClass(this.document.body, 'light-theme');
    this.storage.set(THEME, null);
  }
}