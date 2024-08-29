import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditPokemonComponent } from './pokemon/edit-pokemon/edit-pokemon.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '', redirectTo: 'pokemons', pathMatch: 'full'
  },
  {
    path:'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },

  {
    path: 'pokemons',
    loadComponent: () => import('./pokemon/list-pokemon/list-pokemon.component').then(m => m.ListPokemonComponent),
    canActivate: [authGuard]
  },
  {
    path: 'pokemon/:id',
    loadComponent: () => import('./pokemon/detail-pokemon/detail-pokemon.component').then(m => m.DetailPokemonComponent),
    canActivate: [authGuard]
  },
  {
    path:'edit-pokemon/:id',
    loadComponent: () => import('./pokemon/edit-pokemon/edit-pokemon.component').then(m => m.EditPokemonComponent),
    canActivate:[authGuard]
  },
  {
    path:'pokemon-add',
    loadComponent: () => import('./pokemon/add-pokemon/add-pokemon.component').then(m => m.AddPokemonComponent),
    canActivate: [authGuard]
  },  
  {
    path: '**', component: PageNotFoundComponent
  }
];
