import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Auth } from '../interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //De las variables de entorno
  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth() {
    return { ...this._auth }
  }
  
  constructor( private http: HttpClient ) { }

  verificaAutenticacion(): Observable<boolean> { //Otra opción es colocar un boolean normal

    //Validación para saber si existe en el local storage
    if ( !localStorage.getItem('token') ) {
      return of(false); //Transforma un valor en un observable
    }
    
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
             .pipe(
               map( auth => {
                this._auth = auth; //Recuperar la información del usuario
                return true;
               })
             )

  }

  login() {
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`) 
             //Para almacenar el usuario
             .pipe(
               tap(auth => this._auth = auth),
               tap(auth => localStorage.setItem('id', auth.id))
             );
  }
}
