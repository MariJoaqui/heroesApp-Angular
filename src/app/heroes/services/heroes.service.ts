import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Heroe } from '../interfaces/heroes.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  baseUrl: string = 'http://localhost:3000';

  constructor( private http: HttpClient ) { }

  //Petición para obtener la información del url
  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes`);
  }

  getHeroePorId( id: string ): Observable<Heroe>{
    return this.http.get<Heroe>(`${ this.baseUrl }/heroes/${ id }`);
  }

  //Obtener de la base de datos (get)
  getSugerencias( termino: string ): Observable<Heroe[]> {
    //q = query, _limit = limite
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes?q=${ termino }&_limit=6`);
  }

  //Agregar en la base de datos (post)
  agregarHeroe( heroe: Heroe ): Observable<Heroe> {
    //Se retorne con una petición post
    return this.http.post<Heroe>(`${ this.baseUrl }/heroes`, heroe);
  }

  //Actualizar en la base de datos (put)
  actualizarHeroe( heroe: Heroe ): Observable<Heroe> {
    //Se retorne con una petición post
    return this.http.put<Heroe>(`${ this.baseUrl }/heroes/${ heroe.id }`, heroe); //Trabaja con el id
  }

  //Borrar en la base de datos (delete)
  borrarHeroe( id: string ): Observable<any> {
    //Se retorne con una petición post
    return this.http.delete<any>(`${ this.baseUrl }/heroes/${ id }`);
  }
}
