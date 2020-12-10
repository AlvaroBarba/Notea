import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Nota } from 'src/app/model/nota';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.page.html',
  styleUrls: ['./nota.page.scss'],
})
export class NotaPage implements OnInit {

  nota:Nota 

  constructor(private controller:ModalController) {
    
  }

  ngOnInit() {
  }

  backButton(){
    this.controller.dismiss();
  }

}
