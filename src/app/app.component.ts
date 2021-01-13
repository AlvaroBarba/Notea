import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';
import { LanguageService } from './services/language.service';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  logged:boolean

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authS:AuthService,
    private theme: ThemeService,
    private Lang: LanguageService,
    private route: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
      this.theme.selectedTheme();
      this.authS.init();
      this.Lang.setInitialAppLanguage();
    });
  }

  //Funciones para cambiar el tema de la app

  enableDark(){
    this.theme.enableDark();
  }

  enableLight(){
    this.theme.enableLight();
  }

  enableDefault(){
    this.theme.enableDefault();
  }

  //Funcion para que el swipe menú no aparezca en la pantalla de login

  checkURL():boolean{
    if("/login" == this.route.url){
      this.logged = false
    }else{
      this.logged = true
    }
    return this.logged
  }
}
