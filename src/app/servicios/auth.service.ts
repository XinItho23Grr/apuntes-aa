import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Users } from '../pages/interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient) { }

  //Obtenemos toos los usuarios
  GetAllUsers():Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios`);
  }
  //Obtenemos toos los usuarios por medio de su username
  //any se convierte en cualquier tipo de objeto
  GetUserById(codigo: any):Observable<Users>
  {
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?username=${codigo}`);
  }

  

}
