import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCrudService } from 'src/app/servicios/api-crud.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.page.html',
  styleUrls: ['./eliminar.page.scss'],
})
export class EliminarPage implements OnInit {

  animalito={
    id:0,
    nombre:"",
    tipoMascota:"",
    raza:""
  }
  constructor(private router:Router, 
              private apiCrud: ApiCrudService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getAnimalitoById(this.getIdFromUrl());
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
  
  eliminarAnimalito(){
    this.apiCrud.EliminarAnimalito(this.animalito).subscribe();
    this.router.navigateByUrl("listar");
  }
}
