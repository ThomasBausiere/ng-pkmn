import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../pokemon';
import { Router, RouterModule } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';


@Component({
  selector: 'app-search-pokemon',
  standalone: true,
  imports: [PokemonFormComponent, FormsModule, CommonModule, RouterModule],
  templateUrl: './search-pokemon.component.html',
  providers:[PokemonService]
})
export class SearchPokemonComponent implements OnInit{

  searchTerms = new Subject<string>();
  pokemons$:Observable<Pokemon[]>;

  constructor(private router: Router, private pokemonService: PokemonService) {}
  ngOnInit(): void {
      this.pokemons$= this.searchTerms.pipe(
       debounceTime(300),
       distinctUntilChanged(),
       switchMap((term)=>this.pokemonService.serachPokemonList(term)) 
      )
  }
  search(term:string){
    this.searchTerms.next(term);
  }
  goToDetail(pokemon:Pokemon){
    const link =['/pokemon', pokemon.id];
    this.router.navigate(link)
  }
}


