import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes : Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  //Se inyecta el servicio
  constructor( private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  //Función de buscar término
  buscando() {
    this.heroesService.getSugerencias( this.termino.trim() )
      .subscribe( heroes => this.heroes = heroes );
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ) {
    //Controlar el error cuando no hay nada
    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }
    
    const heroe: Heroe = event.option.value; //Se obtiene el valor
    this.termino = heroe.superhero; //Se iguala el término para que aparezca la opcíón seleccionada
  
    //Se usa la funcion del servico para obtener por id
    this.heroesService.getHeroePorId( heroe.id! )
      .subscribe( heroe => this.heroeSeleccionado = heroe );
  }

}
