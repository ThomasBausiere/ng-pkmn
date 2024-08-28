import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonFormComponent } from "../pokemon-form/pokemon-form.component";
import { Pokemon } from '../pokemon';

@Component({
    selector: 'app-add-pokemon',
    standalone: true,
    template: `
    <h2 class="center">Ajouter un pokémon</h2>
    <app-pokemon-form [pokemon]="pokemon"></app-pokemon-form>
      `,
    imports: [PokemonFormComponent, FormsModule, CommonModule],
    providers:[ PokemonService]
})
export class AddPokemonComponent implements OnInit {

  pokemon:Pokemon;
  ngOnInit() {
      this.pokemon= new Pokemon();
  }
  constructor(
    private route:ActivatedRoute,
    private pokemonService: PokemonService
  ) { }
}
