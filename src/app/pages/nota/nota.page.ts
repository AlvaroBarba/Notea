import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { map, Map, marker, tileLayer } from 'leaflet';
import { Nota } from 'src/app/model/nota';
import { LanguageService } from 'src/app/services/language.service';
import { TtsService } from 'src/app/services/tts.service';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.page.html',
  styleUrls: ['./nota.page.scss'],
})
export class NotaPage implements OnInit {

  nota:Nota
  text:string
  title:string
  latitud:any
  longitud:any
  mapa:Map
  marcador:any
  cargaMapa = false

  constructor(private controller:ModalController,
    private tts: TtsService,
    private lang: LanguageService) {
    
  }

  //Aquí comprobamos si al entrar en la nota tiene coordenadas para mostrar o no el mapa

  ngOnInit() {
    if(this.nota.latitud!=null && this.nota.longitud!=null){
      this.vistaMapa();
    }
  }

  //Botón atrás

  async backButton(){
    await this.controller.dismiss();
  }

  //Leer el titulo y el texto de la nota

  speak(){
    this.text = this.nota.texto
    this.title = this.nota.titulo
    this.tts.talk(this.title);
    this.tts.talk(this.text);
  }

//Mapa con el marcador y nota de la ubicación para el coche

  public vistaMapa() {
    this.latitud = this.nota.latitud;
    this.longitud = this.nota.longitud;
    if (this.longitud != null && this.latitud != null) {
      this.cargaMapa = true;
      this.mapa = new Map("mapa").setView([this.latitud, this.longitud], 50);
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' })
        .addTo(this.mapa); 
      this.marcador = marker([this.latitud, this.longitud], {
        draggable:
          true
      }).addTo(this.mapa);
      setTimeout(()=>{
        this.mapa.invalidateSize();
      }, 400);

      //Este switch para controlar el idioma del mensaje en el mapa
      switch(this.lang.selected){
        case "es":
          this.marcador.bindPopup("Coche aparcado aquí").openPopup();
          break;
        case "en":
          this.marcador.bindPopup("Your car is here").openPopup();
          break;
      }
    }
  }
}
