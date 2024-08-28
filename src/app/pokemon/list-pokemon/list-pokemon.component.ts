import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { BorderCardDirective } from '../border-card.directive';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SearchPokemonComponent } from "../search-pokemon/search-pokemon.component";

@Component({
    selector: 'app-list-pokemon',
    standalone: true,
    templateUrl: './list-pokemon.component.html',
    providers: [PokemonService, HttpClient,],
    imports: [CommonModule, BorderCardDirective, PokemonTypeColorPipe, FormsModule, RouterModule, SearchPokemonComponent]
})
export class ListPokemonComponent implements OnInit {
  private http =inject(HttpClient);
  pokemonList: Pokemon[] = [];

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemonList().subscribe(
      pokemons => this.pokemonList = pokemons,
      error => console.error('There was an error fetching the Pokemon list:', error)
    );
  }

  goToPokemon(pokemon: Pokemon) {
    this.router.navigate(['/pokemon', pokemon.id]);
  }
}
