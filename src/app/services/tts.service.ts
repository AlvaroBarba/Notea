import { Injectable } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Injectable({
  providedIn: 'root'
})
export class TtsService {

  constructor(private tts: TextToSpeech) {}

  //Servicio de lectura de notas

  talk(text){
    return this.tts.speak({
      text: text,
      locale: 'es-ES',
      rate: 1
    })
    .then(() => console.log("Leido!!"))
    .catch((failed:any) => console.log(failed));
  }
}