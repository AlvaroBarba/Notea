import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';
import { LanguageService } from './services/language.service';

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
    private Lang: LanguageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent()
      this.splashScreen.hide();
      this.authS.init();
      this.Lang.setInitialAppLanguage();
    });
  }

  enableDark(){
    this.theme.enableDark();
  }

  enableLight(){
    this.theme.enableLight();
  }

  enableDefault(){
    this.theme.enableDefault();
  }

}
