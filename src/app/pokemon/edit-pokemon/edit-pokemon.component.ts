import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { PokemonFormComponent } from "../pokemon-form/pokemon-form.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-edit-pokemon',
    standalone: true,
    template: `
    <h2 class="center">Editer {{ pokemon?.name }}</h2>
    <p *ngIf="pokemon" class="center">
      <img [src]="pokemon.picture">
    </p>
    <app-pokemon-form  *ngIf="pokemon" [pokemon]="pokemon"></app-pokemon-form>
  `,
    imports: [PokemonFormComponent, FormsModule, CommonModule],
    providers:[ PokemonService]
})
export class EditPokemonComponent implements OnInit {
  pokemon: Pokemon | undefined;
  constructor(
    private route:ActivatedRoute,
    private pokemonService: PokemonService
  ) { }
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.pokemonService.getPokemonById(id)
      .subscribe(pokemon => this.pokemon = pokemon);
  }
}
