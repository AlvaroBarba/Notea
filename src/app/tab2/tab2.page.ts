import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Nota } from '../model/nota';
import { LoadingService } from '../services/loading.service';
import { NotasService } from '../services/notas.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public tasks:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private notasS:NotasService,
    private loading:LoadingService,
    private toast: ToastService
  ) {
    this.tasks=this.formBuilder.group({
      title:['',Validators.required],
      description:['']
    })
  }

  public async sendForm(){
    await this.loading.presentLoading();
    
    let data:Nota={
      titulo:this.tasks.get('title').value,
      texto:this.tasks.get('description').value
    }
    this.notasS.agregaNota(data)
    .then((respuesta)=>{
      this.tasks.setValue({
        title:'',
        description:''
      })
      this.loading.loadingController.dismiss();
      this.toast.presentToast("Nota guardada","success");
    })
    .catch((err)=>{
      this.loading.loadingController.dismiss();
      this.toast.presentToast("Error guardando nota","danger");
      console.log(err);
    })
  }
}
