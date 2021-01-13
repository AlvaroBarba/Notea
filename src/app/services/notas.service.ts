import { Injectable, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Nota } from '../model/nota';
import { AuthService } from './auth.service';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private myCollection:AngularFirestoreCollection<any>;
  


  constructor(private fire:AngularFirestore,
    private user: AuthService,
    private lang: LanguageService,
    private loader: LoadingController) {
    this.myCollection=fire.collection<any>(environment.userCollection).doc(this.user.getUser().userId).collection(environment.notasCollection);
  }

  loadCollection(){
    this.myCollection=this.fire.collection<any>(environment.userCollection).doc(this.user.getUser().userId).collection(environment.notasCollection);
  }

  agregaNota(nuevaNota:Nota):Promise<any>{
    return this.myCollection.add(nuevaNota);
  }
  leeNotas():Observable<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>{
    return this.myCollection.get();
  }
  leeNota(id:any):Observable<any>{
    return this.myCollection.doc(id).get();
  }
  actualizaNota(id:any,nuevaNota:Nota):Promise<void>{
    return this.myCollection.doc(id).update({titulo:nuevaNota.titulo,texto:nuevaNota.texto});
  }
  borraNota(id:any):Promise<void>{
    return this.myCollection.doc(id).delete();
  }

  //Titulo en diferentes idiomas para la nota de aparacamiento

  tituloParking():string{
    switch (this.lang.selected){
      case 'es':
        return "¿Donde he aparcado?"
        break;
      case 'en':
        return "Where is my car?"
        break;
      default:
        return "¿Donde he aparcado?"
        break;
    }
  }

  //Crea la nota de la localización del coche de forma automática

  createParking(latitud:any, longitud: any){
    try{
      let nota:Nota={
      titulo:this.tituloParking(),
      latitud:latitud,
      longitud:longitud
    }
    this.agregaNota(nota)
  }catch(ex){
    
  }
    
  }

}