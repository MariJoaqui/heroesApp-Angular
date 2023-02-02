import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar, //Para los mensajitos de crear y actualizar
               public dialog: MatDialog ) { } //Para la confimación de eliminar

  ngOnInit(): void {

    if ( !this.router.url.includes('editar') ) {
      return;
    }

    //Obtener el id cuando existe el heroe creado
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroePorId( id ) )
      )
      .subscribe( heroe => this.heroe = heroe ); //Se iguala al arreglo de arriba

  }

  guardar() {
    
    //Validación para obligar a escribir el nombre del super héroe
    if ( this.heroe.superhero.trim().length === 0) {
      return;
    }

    //Validación para crear o editar los heroes
    if ( this.heroe.id ) {

      this.heroesService.actualizarHeroe( this.heroe )
        .subscribe( heroe => this.mostrarSnacknar('Registro actualizado'))

    } 
    else {

      //Se envía al servicio para insertar en la base de datos
      this.heroesService.agregarHeroe( this.heroe )
      .subscribe( heroe => {
        this.router.navigate(['/heroes/editar', heroe.id]); //Navega hacia la pantalla de editar del heroe luego que lo ha creado
        this.mostrarSnacknar('Registro creado');
      })

    }

  }

  borrarHeroe() {

    const dialog = this.dialog.open( ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    })

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.heroesService.borrarHeroe( this.heroe.id! )
            .subscribe ( resp => {
              this.router.navigate(['/heroes']);
            });
        }
      }
    )
      
  }

  mostrarSnacknar( mensaje: string ) {

    this.snackBar.open( mensaje, 'ok!', { //Mensaje y lo que se muestra en el botón
      duration: 2500
    });

  }

}
