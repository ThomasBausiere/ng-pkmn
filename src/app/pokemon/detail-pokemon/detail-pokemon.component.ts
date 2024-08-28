import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { BorderCardDirective } from '../border-card.directive';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { LoaderComponent } from "../loader/loader.component";

@Component({
    selector: 'app-detail-pokemon',
    standalone: true,
    templateUrl: './detail-pokemon.component.html',
    providers: [PokemonService],
    imports: [CommonModule, BorderCardDirective, PokemonTypeColorPipe, LoaderComponent]
})
export class DetailPokemonComponent implements OnInit {
  pokemon: Pokemon | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.pokemonService.getPokemonById(id)
      .subscribe(pokemon => this.pokemon = pokemon);
  }
  deletePokemon(pokemon:Pokemon){
    this.pokemonService.deletePokemonById(pokemon.id).subscribe(()=>this.goToPokemonList());
  }
  goToPokemonList() {
    console.log('Navigating to the pokemon list');
    this.router.navigate(['/pokemons']);
  }

  goToPokemonEdit(pokemon: Pokemon) {
    console.log('Navigating to edit pokemon:', pokemon.id);
    this.router.navigate(['/edit-pokemon', pokemon.id]);
  }


}
