import { Component, OnInit } from '@angular/core';
import { ApiCrudService } from 'src/app/servicios/api-crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage implements OnInit {

  animalito ={
    id:0,
    nombre:"",
    tipoMascota:"",
    raza:""
  }

  constructor(private apiCrud: ApiCrudService, 
              private router: Router) { }


  ionViewWillEnter(){
    this.getAnimalitoById(this.getIdFromUrl());
  }


  ngOnInit() {
  }

  getIdFromUrl(){
    let url=this.router.url;
    let arr=url.split("/",3);
    let id = parseInt(arr[2]);
    return id;
  }

  getAnimalitoById(animalitoID:number){
    this.apiCrud.BuscarAnimalitoId(animalitoID).subscribe(
      (resp:any)=>{                 //resp llega en formato de arreglo de un objeto 
        this.animalito={
          id: resp[0].id,
          nombre: resp[0].nombre,
          tipoMascota: resp[0].tipoMascota,
          raza: resp[0].raza
        }
      }
    )
  }

  updateAnimalito(){
      this.apiCrud.ActualizarAnimalito(this.animalito).subscribe();
      this.router.navigateByUrl("/listar");
  }

}
