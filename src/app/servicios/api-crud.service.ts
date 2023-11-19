import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAnimalitos } from '../pages/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { IAnimalito } from '../pages/interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class ApiCrudService {

  constructor(private httpclient:HttpClient) { }

  listarAnimalitos():Observable<IAnimalitos>{
    return this.httpclient.get<IAnimalitos>(`${environment.apiUrl}/animalitos`);
  }

  CrearAnimalito(newAnimalito: IAnimalito): Observable<IAnimalito>{
    return this.httpclient.post<IAnimalitos>(`${environment.apiUrl}/animalitos`, newAnimalito);
  }

  BuscarAnimalitoId(id:number):Observable<IAnimalitos>{
    return this.httpclient.get<IAnimalitos>(`${environment.apiUrl}/animalitos/?id=${id}`);
  }

  ActualizarAnimalito(animalito:any):Observable<IAnimalitos>{
    return this.httpclient.put<IAnimalitos>(`${environment.apiUrl}/animalitos/${animalito.id}`, animalito);
  }

  EliminarAnimalito (animalito:any): Observable<IAnimalitos>{
    return this.httpclient.delete<IAnimalitos>(`${environment.apiUrl}/animalitos/${animalito.id}`);
  }
}
