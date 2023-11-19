import { Component, OnInit } from '@angular/core';
import { IAnimalito } from '../interfaces/interfaces';
import { ApiCrudService } from 'src/app/servicios/api-crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  newAnimalito: IAnimalito={
    nombre : "",
    raza: "",
    tipoMascota: ""
  }

  constructor(private apiCrud: ApiCrudService,
              private router: Router) { }

  ngOnInit() {
  }

  crearAnimalito(){
    this.apiCrud.CrearAnimalito(this.newAnimalito).subscribe();
    this.router.navigateByUrl("/listar");
  }
}
