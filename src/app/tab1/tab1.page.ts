import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Nota } from '../model/nota';
import { EditNotaPage } from '../pages/edit-nota/edit-nota.page';
import { NotasService } from '../services/notas.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NotaPage } from '../pages/nota/nota.page';
import { LanguageService } from '../services/language.service';
import { LocationService } from '../services/location.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public listaNotas = [];
  public listaNotasCopy = [];
  public search: boolean = false;
  private latitud = null
  private longitud = null;

  constructor(private notasS: NotasService,
    private modalController: ModalController,
    private nativeStorage: NativeStorage,
    private alertController: AlertController,
    private authS: AuthService,
    private lang: LanguageService,
    private locator: LocationService,
    private router: Router) { }



  ngOnInit() {
    this.cargaDatos();
    this.nativeStorage.setItem('myitem', { property: 'value', anotherProperty: 'anotherValue' })
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
  }


  ionViewDidEnter() {
    this.notasS.loadCollection();
    this.cargaDatos();
  }

  public cargaDatos($event = null) {
    try {
      this.notasS.leeNotas()
        .subscribe((info: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
          //Ya ha llegado del servidor
          this.listaNotas = [];
          info.forEach((doc) => {
            let nota = {
              id: doc.id,
              ...doc.data()
            }
            this.listaNotas.push(nota);
            this.listaNotasCopy = this.listaNotas;
          });
          //Ocultar el loading
          console.log(this.listaNotas);
          if ($event) {
            $event.target.complete();
          }
        })
    } catch (err) {
      //Error
    }
  }

  async presentAlertConfirm(id: any) {
    switch (this.lang.selected) {
      case "es":
        const alert = await this.alertController.create({
          cssClass: "my-custom-alert",
          header: "Borrar",
          message: "¿Desea borrar?",
          buttons: [
            {
              text: "No",
              role: "cancel",
              handler: (blah) => {
              }
            }, {
              text: "Si",
              handler: () => {
                this.borraNota(id)
              }
            }
          ]
        });
        await alert.present();
        break;
      case "en":
        const alert2 = await this.alertController.create({
          cssClass: "my-custom-alert",
          header: "Delete",
          message: "¿Are you sure about delete this note?",
          buttons: [
            {
              text: "No",
              role: "cancel",
              handler: (blah) => {
              }
            }, {
              text: "Yes",
              handler: () => {
                this.borraNota(id)
              }
            }
          ]
        });
        await alert2.present();
        break;
    }
  }

  public async borraNota(id: any) {
    this.notasS.borraNota(id)
      .then(() => {
        //ya está borrada allí
        let tmp = [];
        this.listaNotas.forEach((nota) => {
          if (nota.id != id) {
            tmp.push(nota);
          }
        })
        this.listaNotas = tmp;
        this.listaNotasCopy = this.listaNotas;
      })
      .catch(err => {

      })
  }


  public async editaNota(nota: Nota) {
    const modal = await this.modalController.create({
      component: EditNotaPage,
      cssClass: 'my-custom-class',
      componentProps: {
        nota: nota
      }
    });
    return await modal.present();
  }

  public async muestraNota(nota: Nota) {
    const modal = await this.modalController.create({
      component: NotaPage,
      cssClass: 'my-custom-note',
      componentProps: {
        nota: nota
      }
    });
    return await modal.present();
  }

  showSearch() {
    this.search = true;
  }

  closeSearch() {
    this.search = false;
  }

  //Filtro para la busqueda de notas

  public filterList(evt: any) {
    const val = evt.srcElement.value;
    this.listaNotasCopy = this.listaNotas;
    if (val && val.trim() != '') {
      this.listaNotasCopy = this.listaNotasCopy.filter((data) => {
        return (data.titulo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  //Obtener las coordenadas del dispositivo

  async obtenerCoordenadas(){
    await this.locator.getPosition().then((respuesta)=>{
      this.latitud = respuesta.coords.latitude;
      this.longitud = respuesta.coords.longitude;
    }).catch((error)=>{
      console.log(error);
    })
console.log("latitud: "+this.latitud);
    console.log("longitud: "+this.longitud);
  }

  //Crea la nota con las coordenadas del dispositivo

  async parking() {
    await this.obtenerCoordenadas();
    this.notasS.createParking(this.latitud, this.longitud);
    this.cargaDatos();
  }

}
