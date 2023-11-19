import { Component, OnInit } from '@angular/core';
import { ApiCrudService } from 'src/app/servicios/api-crud.service';
import { LoadingController } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { IAnimalitos } from '../interfaces/interfaces';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage {

  animalitos:IAnimalitos[]=[];

  constructor(private animalitoService: ApiCrudService,
              private loadingCtrl : LoadingController) { }

  
  ionViewWillEnter(){
  this.loadAnimalitos();
  }

  async loadAnimalitos(event?: InfiniteScrollCustomEvent){
    
    const loading = await this.loadingCtrl.create({
      message: "Cargando..",
      spinner: "bubbles"
    });
    await loading.present();


    this.animalitoService.listarAnimalitos().subscribe(
      {
        next: resp=>{
          console.log(resp);
         loading.dismiss();
          let listString = JSON.stringify(resp)
          this.animalitos=JSON.parse(listString)
          event?.target.complete();
          console.log(this.animalitos);
          
        },
        error: err =>{
          console.log(err.error.message);
         loading.dismiss();
        }
      }
    ) 
  }
 
}
