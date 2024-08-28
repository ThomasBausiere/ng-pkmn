import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { PokemonService } from './pokemon.service';
import { FormsModule } from '@angular/forms';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { InMemoryDataService } from '../in-memory-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';


@NgModule({
  declarations: [
  ],
  imports: [
    ListPokemonComponent,
    DetailPokemonComponent,
    FormsModule,
    CommonModule,
    PokemonFormComponent,
    
  ],
  providers:[PokemonService, HttpClientInMemoryWebApiModule]
})
export class PokemonModule { }
