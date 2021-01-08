import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/usuario';
import { AuthService } from '../services/auth.service';
import { LanguageService } from '../services/language.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  usuario:Usuario

  constructor(private authS:AuthService,
    private router: Router,
    private theme: ThemeService,
    private lang: LanguageService) {
      
      this.usuario = authS.getUser();
    }

  public async logout(){
    await this.authS.logout();
    if(!this.authS.isLogged()){
      this.router.navigate(['/login'])
    }
  }

  enableDark(){
    this.theme.enableDark();
  }

  enableLight(){
    this.theme.enableLight();
  }

  changeLanguage($event){
    this.lang.setLanguage($event.target.value);
    console.log($event.target.value);
  }

}
