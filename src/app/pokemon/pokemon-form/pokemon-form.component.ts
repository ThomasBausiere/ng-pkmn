import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonTypeColorPipe } from "../pokemon-type-color.pipe";
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component";

@Component({
    selector: 'app-pokemon-form',
    templateUrl: './pokemon-form.component.html',
    standalone: true,
    providers: [PokemonService],
    imports: [CommonModule, FormsModule, PokemonTypeColorPipe, LoaderComponent]
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon;
  types: string[];
  isAddForm: boolean;

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) { }

 ngOnInit() {
  this.types = this.pokemonService.getPokemonTypeList();
  this.isAddForm = this.router.url.includes('add');
 }

  onSubmit() {
    if(this.isAddForm){
      this.pokemonService.addPokemon(this.pokemon).subscribe((pokemon: Pokemon)=>this.router.navigate(['/pokemon', pokemon.id]));
    }
    else{
      this.pokemonService.updatePokemon(this.pokemon).subscribe(()=>this.router.navigate(['/pokemon', this.pokemon.id]));
    }
  }

  hasType(type: string): boolean {
    return this.pokemon.types.includes(type);
  }
  selectType($event: Event, type: string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;

    if(isChecked) {
      this.pokemon.types.push(type);
    } else {
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }

  isTypesValid(type: string): boolean {
    if(this.pokemon.types.length == 1 && this.hasType(type)) {
      return false;
    }

    if(this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false;
    }

    return true;
  }
}
