import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    //Si entra a auth se lleva también a su módulo con el loadChildren
    path: 'auth', //Cuando alguien entre al path, entra a las rutas hijas
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule ),
    canLoad: [ AuthGuard ], //Se llama el guard para validar si entra o no
    canActivate: [ AuthGuard ]
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    //component: ErrorPageComponent (es lo mismo, pero lo correcto es usar el redirecTo)
    redirectTo: '404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})

export class AppAroutingModule { }