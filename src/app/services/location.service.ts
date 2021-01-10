import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private locator: Geolocation) { }

  //Obtener coordenadas actuales

  public async getPosition(){
    return this.locator.getCurrentPosition();
  }

}
