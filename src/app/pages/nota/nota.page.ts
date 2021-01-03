import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Nota } from 'src/app/model/nota';
import { TtsService } from 'src/app/services/tts.service';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.page.html',
  styleUrls: ['./nota.page.scss'],
})
export class NotaPage implements OnInit {

  nota:Nota
  text:string

  constructor(private controller:ModalController,
    private tts: TtsService) {
    
  }

  ngOnInit() {
  }


  backButton(){
    this.controller.dismiss();
  }

  async speak(){
    this.text = this.nota.texto
    this.tts.talk(this.text);
  }

}
